import {Character, Priest} from 'alclient'
import sleep from 'utils/sleep'
import GameState from './gameState'

async function moveLoop(
  gameState: GameState,
  farmers: Character[],
): Promise<void> {
  while (true) {
    for (const farmer of farmers) {
      try {
        if (gameState.healState === 'healing' && farmer instanceof Priest) {
          continue
        }

        if (!!gameState.goldSender && farmer.id === gameState.goldSender.id) {
          continue
        }
        if (farmer.moving === true) {
          continue
        }
        const nearestGoo = farmer.getNearestMonster('crab')
        if (!nearestGoo) {
          // Move to crab spawn
          // console.log('Moing to crabs')
          await farmer.smartMove('crab').catch(() => {
            /* Empty to suppress messages */
          })
        } else if (nearestGoo.distance > farmer.range && !farmer.moving) {
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

export default moveLoop