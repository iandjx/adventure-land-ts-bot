import * as AL from 'alclient'
import settings from './settings.config'
import getStatus from 'global/getstatus'
import healLoop from 'priest/heal'
import regenLoop from 'global/regenloop'
import GameState from 'global/gameState'
import moveLoop from 'global/moveLoop'
import attackLoop from 'global/attackLoop'
import chestLoop from 'global/chestLoop'
import respawnLoop from 'global/respawnLoop'
import goldLoop from 'global/goldLoop'
import {setupParty} from 'global/party'
import sleep from 'utils/sleep'
import {ItemName} from 'alclient'
import {getDistance} from 'utils/getDistance'

async function run() {
  await Promise.all([
    AL.Game.login(settings.EMAIL, settings.PASSWORD),
    AL.Pathfinder.prepare(),
  ])
  const warrior = await AL.Game.startWarrior('rastarix', 'US', 'II')
  const merchant = await AL.Game.startMerchant('Merchiex', 'US', 'II')
  const ranger = await AL.Game.startRanger('crosscutting', 'US', 'II')
  const priest = await AL.Game.startPriest('priestiex', 'US', 'II')

  const gameState = new GameState()

  const farmers = [ranger, priest, warrior]

  //GLOBAL LOOPS
  setupParty(merchant, farmers)

  getStatus(farmers)
  regenLoop(farmers)
  healLoop(priest, [merchant, warrior, ranger], gameState)

  moveLoop(gameState, farmers)

  attackLoop(farmers, gameState)

  chestLoop(farmers)

  respawnLoop(merchant, farmers)

  goldLoop(merchant, farmers, gameState)

  async function upgradeLoop(itemName: ItemName): Promise<void> {
    while (true) {
      let blade = merchant.items.find(item => item?.name === itemName)
      if (!blade) {
        await merchant.smartMove('weapons').catch(err => console.log(err))
        await merchant.buy(itemName, 1).catch(err => console.log(err))
      }
      blade = merchant.items.find(item => item?.name === itemName)

      if (blade?.level === 4) {
        continue
      }
      let scroll = merchant.items.find(item => item.name === 'scroll0')
      if ((scroll && scroll.q && scroll?.q < 10) || !scroll) {
        await merchant.smartMove('scrolls').catch(err => console.log(err))
        await merchant.buy('scroll0', 10).catch(err => console.log(err))
      }

      scroll = merchant.items.find(item => item.name === 'scroll0')

      await merchant.smartMove('newupgrade').catch(err => console.log(err))
      const bladeIndex = merchant.items.findIndex(
        item => item?.name === itemName,
      )
      const scrollIndex = merchant.items.findIndex(
        item => item.name === 'scroll0',
      )

      const upgradeSucc = await merchant
        .upgrade(bladeIndex, scrollIndex)
        .catch(err => console.log(err))
      console.log(upgradeSucc)
      console.log(merchant.items[bladeIndex])

      await sleep(250) /* Wait a bit until the next regen */
    }
  }
  // upgradeLoop('staff')

  async function itemLoop(): Promise<void> {
    await sleep(5000) /* Wait a bit until the next regen */

    while (true) {
      for (const item of merchant.items) {
        if (!item) {
          continue
        }
        const itemName = item.name
        const itemIndex = merchant.items.findIndex(el => el === item)
        switch (itemName) {
          case 'blade':
            if (getDistance(merchant, warrior) > merchant.range) {
              if (!merchant.moving) {
                await merchant
                  .smartMove({map: warrior.map, x: warrior.x, y: warrior.y})
                  .catch(err => {
                    console.log(err)
                  })
              }

              break
            }

            await merchant
              .sendItem(warrior.id, itemIndex, 1)
              .catch(err => console.log(err))
            break
          case 'bow':
            // await merchant
            //   .smartMove({map: ranger.map, x: ranger.x, y: ranger.y})
            //   .catch(err => console.log(err))
            await merchant
              .sendItem(ranger.id, itemIndex, 1)
              .catch(err => console.log(err))
            break
          case 'staff':
            // await merchant
            //   .smartMove({map: priest.map, x: priest.x, y: priest.y})
            //   .catch(err => console.log(err))
            await merchant
              .sendItem(priest.id, itemIndex, 1)
              .catch(err => console.log(err))
            break
          default:
            break
        }
      }

      await sleep(5000) /* Wait a bit until the next regen */
    }
  }
  itemLoop()
  // const warblade = warrior.items.findIndex(
  //   item => item.name === 'blade' && item.level === 4,
  // )
  // await warrior.equip(warblade)
  // const warbow = ranger.items.findIndex(
  //   item => item.name === 'bow' && item.level === 4,
  // )
  // await ranger.equip(warbow)

  // const warstaff = priest.items.findIndex(
  //   item => item.name === 'staff' && item.level === 4,
  // )
  // await priest.equip(warstaff)
}
run()
