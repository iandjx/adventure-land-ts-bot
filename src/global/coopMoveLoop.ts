import { Character, Priest } from 'alclient'
import { Entity } from 'alclient/build/Entity'
import sleep from 'utils/sleep'
import GameState from './gameState'

async function coopMoveLoop(
  gameState: GameState,
  farmers: Character[],
): Promise<void> {
  while (true) {
    if (
      gameState.coopTargetMonster &&
      gameState.coopTargetMonster.monster.hp <= 0
    ) {
      gameState.coopTargetMonster = undefined
    }
    for (const farmer of farmers) {
      if (gameState.coopTargetMonster) {
        console.log(gameState.coopTargetMonster.monster.id)
        console.log(farmer.name)
      }
      if (gameState.healState === 'healing' && farmer instanceof Priest) {
        continue
      }

      if (!!gameState.goldSender && farmer.id === gameState.goldSender.id) {
        continue
      }
      if (!farmer.s.monsterhunt) {
        continue
      }
      if (farmer.moving === true) {
        continue
      }

      if (farmer.ctype === 'warrior') {
        const nearestGoo = farmer.getNearestMonster('squig')
        gameState.coopTargetMonster = nearestGoo
        if (!nearestGoo) {
          // Move to crab spawn
          await farmer.smartMove('squig').catch(() => {
            /* Empty to suppress messages */
          })
        } else if (nearestGoo.distance > farmer.range && !farmer.moving) {
          await farmer.smartMove(nearestGoo.monster).catch(() => {
            /* Empty to suppress messages */
          })
        }
      }
      if (farmer.ctype !== 'warrior') {
        const squig = farmer.getNearestMonster('squig')
        if (!squig) {
          await farmer.smartMove('squig').catch(() => {
            // suppress
          })
          continue
        }

        if (
          gameState.coopTargetMonster &&
          gameState.coopTargetMonster.distance > farmer.range &&
          !farmer.moving
        ) {
          console.log('nearest goo', gameState.coopTargetMonster.distance)
          await farmer
            .smartMove(gameState.coopTargetMonster.monster)
            .catch(() => {
              //supress
            })
        }
      }
    }

    await sleep(250) /* Wait a bit until the next move */
  }
}

export default coopMoveLoop
