import { Merchant, Character } from 'alclient'
import { getDistance } from '../utils/getDistance'
import sleep from '../utils/sleep'
import GameState from './gameState'

async function goldLoop(
  merchant: Merchant,
  farmers: Character[],
  gameState: GameState,
): Promise<void> {
  while (true) {
    for (const farmer of farmers) {
      try {
        while (farmer.gold >= 10000) {
          gameState.currentGoldSender = farmer

          if (farmer.map !== merchant.map) {
            if (!merchant.moving) {
              merchant.smartMove(farmer.map)
            }
            continue
          }

          if (getDistance(merchant, farmer) > merchant.range) {
            if (!merchant.moving) {
              await merchant
                .smartMove({ map: farmer.map, x: farmer.x, y: farmer.y })
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
          gameState.currentGoldSender = null
        }
      } catch (err) {
        console.log(err)
      }
    }
    await sleep(250) /* Wait a bit until the next attack */
  }
}

export default goldLoop
