import {setupParty} from './global/party'
import * as AL from 'alclient'
// import {healPartyMemberLoop} from 'priest/heal'
import {Character, Priest} from 'alclient'
import settings from './settings.config'

const sleep = (ms: number | undefined) =>
  new Promise(resolve => setTimeout(resolve, ms))

async function run() {
  await Promise.all([
    AL.Game.login(settings.EMAIL, settings.PASSWORD),
    AL.Pathfinder.prepare(),
  ])
  const warrior = await AL.Game.startWarrior('rastarix', 'US', 'II')
  const merchant = await AL.Game.startMerchant('Merchiex', 'US', 'II')
  const ranger = await AL.Game.startRanger('crosscutting', 'US', 'II')
  const priest = await AL.Game.startPriest('priestiex', 'US', 'II')

  const farmers = [ranger, priest, warrior]
  let healing = false
  let farmerToSendGoldFrom = ''
  setupParty(merchant, farmers)
  console.log('Adventure Start!')

  async function getStatus() {
    while (true) {
      try {
        for (const farmer of farmers) {
          console.log(farmer.id, ' status ')
          console.log('Max HP ', farmer.max_hp, 'Current HP', farmer.hp)
        }
      } catch (error) {
        console.log(error)
      }

      await sleep(10000)
    }
  }

  getStatus()
  async function healLoop(priest: Priest, farmers: Character[]) {
    const maxHeal = priest.attack
    while (true) {
      for (const member of farmers) {
        try {
          if (member.hp <= member.max_hp - maxHeal) {
            console.log(member.id, ' needs healing. current hp ', member.hp)

            if (getDistance(priest, member) > priest.range) {
              await priest.smartMove({x: member.x, y: member.y})
              healing = true
              continue
            }
            const cooldown = priest.getCooldown('attack')
            if (cooldown > 0) await sleep(cooldown) // Wait for attack to become ready

            await priest.heal(member.id).catch(err => console.log(err))
            console.log(member.id, ' healed for ', maxHeal)
            healing = false
          }
        } catch (e) {
          console.error(e)
        }
      }

      await sleep(2000) /* Wait a bit until the next regen */
    }
  }
  healLoop(priest, [merchant, ranger, warrior])

  async function regenLoop() {
    while (true) {
      for (const farmer of farmers) {
        try {
          const cooldown = farmer.getCooldown('use_hp')
          if (cooldown > 0) await sleep(cooldown) // Wait for regen to become ready

          const mpRatio = farmer.mp / farmer.max_mp
          const hpRatio = farmer.hp / farmer.max_hp

          if (hpRatio < mpRatio) {
            if (farmer instanceof Priest) {
              console.log('regenhp')
              await farmer.regenHP().catch(() => {
                /* Empty to suppress messages */
              })
            }
          } else {
            // console.log('regenmp')
            await farmer.regenMP().catch(() => {
              /* Empty to suppress messages */
            })
          }
        } catch (e) {
          // console.error(e)
        }
      }

      await sleep(250) /* Wait a bit until the next regen */
    }
  }
  regenLoop()

  async function moveLoop() {
    while (true) {
      for (const farmer of farmers) {
        try {
          if (healing === true) {
            if (farmer instanceof Priest) {
              continue
            }
          }

          if (farmer.id === farmerToSendGoldFrom) {
            continue
          }
          // console.log('Finding nearest crab to move to')
          const nearestGoo = farmer.getNearestMonster('crab')
          if (!nearestGoo) {
            // Move to crab spawn
            // console.log('Moing to crabs')
            await farmer.smartMove('crab').catch(() => {
              /* Empty to suppress messages */
            })
          } else if (nearestGoo.distance > farmer.range && !farmer.moving) {
            console.log('Moving to nearest crab')
            farmer.smartMove(nearestGoo.monster).catch(() => {
              /* Empty to suppress messages */
            })
          }
        } catch (e) {
          // console.error(e)
        }
      }

      await sleep(250) /* Wait a bit until the next move */
    }
  }
  moveLoop()

  async function attackLoop() {
    while (true) {
      for (const farmer of farmers) {
        try {
          if (farmer instanceof Priest && healing) {
            continue
          }
          if (farmer.id === farmerToSendGoldFrom) {
            continue
          }

          const cooldown = farmer.getCooldown('attack')
          if (cooldown > 0) await sleep(cooldown) // Wait for attack to become ready

          if (farmer.canUse('attack')) {
            const attackableGoo = farmer.getNearestMonster('crab')
            if (attackableGoo && attackableGoo.distance < farmer.range) {
              await farmer.basicAttack(attackableGoo.monster.id).catch(() => {
                /* Empty to suppress messages */
              })
            }
          }
        } catch (e) {
          // console.error(e)
        }
      }

      await sleep(50) /* Wait a bit until the next attack */
    }
  }
  attackLoop()

  async function chestLoop() {
    while (true) {
      for (const farmer of farmers) {
        try {
          farmer.chests.forEach(async chest => {
            await farmer.openChest(chest.id)
          })
        } catch (e) {
          // console.error(e)
        }
      }

      await sleep(1000) /* Wait a bit until the next attack */
    }
  }
  chestLoop()

  async function respawnLoop() {
    while (true) {
      for (const farmer of farmers) {
        try {
          if (merchant.rip) {
            merchant.respawn()
          }
          if (farmer.rip) {
            console.log(farmer.id, ' died respawning')
            farmer.respawn()
          }
        } catch (e) {
          // console.error(e)
        }
      }

      await sleep(1000) /* Wait a bit until the next attack */
    }
  }
  respawnLoop()

  async function sendGold() {
    while (true) {
      for (const farmer of farmers) {
        try {
          while (farmer.gold >= 10000) {
            farmerToSendGoldFrom = farmer.id

            if (farmer.map !== merchant.map) {
              if (!merchant.moving) {
                console.log('going to farmer location')
                merchant.smartMove(farmer.map)
              }
              continue
            }

            if (getDistance(merchant, farmer) > merchant.range) {
              if (!merchant.moving) {
                await merchant
                  .smartMove({map: farmer.map, x: farmer.x, y: farmer.y})
                  .catch(err => {
                    console.log(err)
                  })
              }

              continue
            }
            if (merchant.moving) {
              continue
            }

            await farmer.sendGold(merchant.id, farmer.gold)
            console.log(farmer.gold, ' given to', merchant.id)
            farmerToSendGoldFrom = ''
          }
        } catch (err) {
          console.log(err)
        }
      }
      await sleep(250) /* Wait a bit until the next attack */
    }
  }
  sendGold()
}
run()

const getDistance = (characterA: Character, characterB: Character) => {
  return distance_to_point(
    characterA.x,
    characterA.y,
    characterB.x,
    characterB.y,
  )
}

// we take the x and y coordinates of a point, and compare it to another point
// we can then derive the distance between two points
function distance_to_point(x1: number, y1: number, x2: number, y2: number) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}
