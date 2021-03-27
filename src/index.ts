import {setupParty} from './global/party'
import path from 'path'

import * as AL from 'alclient'
// import {healPartyMemberLoop} from 'priest/heal'
import {Character, Priest} from 'alclient'

const sleep = (ms: number | undefined) =>
  new Promise(resolve => setTimeout(resolve, ms))

async function run() {
  await Promise.all([
    AL.Game.loginJSONFile(path.resolve('credentials.json')),
    AL.Pathfinder.prepare(),
  ])
  const warrior = await AL.Game.startWarrior('rastarix', 'ASIA', 'I')
  const merchant = await AL.Game.startMerchant('Merchiex', 'ASIA', 'I')
  const ranger = await AL.Game.startRanger('crosscutting', 'ASIA', 'I')
  const priest = await AL.Game.startPriest('priestiex', 'ASIA', 'I')

  const farmers = [ranger, priest, warrior]

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
            console.log(priest.canUse('heal'), 'can heal?')
            // if (priest.canUse('heal')) {
            console.log('healling')
            await priest.heal(member.id).catch(err => console.log(err))
            // }
          }
        } catch (e) {
          console.error(e)
        }
      }

      await sleep(2000) /* Wait a bit until the next regen */
    }
  }
  healLoop(priest, [ranger, warrior])

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
          const cooldown = farmer.getCooldown('attack')
          if (cooldown > 0) await sleep(cooldown) // Wait for attack to become ready

          if (farmer.canUse('attack')) {
            const attackableGoo = farmer.getNearestMonster('crab')
            if (attackableGoo && attackableGoo.distance < farmer.range) {
              // We're close enough to attack
              console.log(farmer.id, 'attacking', attackableGoo.monster.id)
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
}
run()
