import { Character, Priest } from 'alclient'
import sleep from 'utils/sleep'
import GameState from './gameState'
import * as AL from 'alclient'

async function coopAttackLoop(
  farmers: Character[],
  gameState: GameState,
): Promise<void> {
  while (true) {
    if (
      gameState.coopTargetMonster &&
      gameState.coopTargetMonster.monster.hp <= 0
    ) {
      gameState.coopTargetMonster = null
    }

    for (const farmer of farmers) {
      if (farmer instanceof Priest && gameState.healState === 'healing') {
        continue
      }
      if (!!gameState.goldSender && farmer.id === gameState.goldSender.id) {
        continue
      }

      // if (!farmer.s.monsterhunt) {
      //   continue
      // }

      const cooldown = farmer.getCooldown('attack')
      if (cooldown > 0) await sleep(cooldown) // Wait for attack to become ready

      if (
        farmer.canUse('attack') &&
        farmer.ctype === 'warrior' &&
        gameState.coopTargetMonster
      ) {
        const distance = AL.Tools.distance(
          { x: farmer.x, y: farmer.y },
          {
            x: gameState.coopTargetMonster.monster.x,
            y: gameState.coopTargetMonster.monster.y,
          },
        )
        if (distance > farmer.range) {
          await farmer
            .smartMove(gameState.coopTargetMonster.monster)
            .catch(err => console.log(err))
        }

        if (distance < farmer.range) {
          await farmer
            .basicAttack(gameState.coopTargetMonster.monster.id)
            .catch(err => {
              console.log(err)
            })
        }
      }

      if (farmer.ctype === 'priest') {
        console.log('priest time')
      }

      if (
        farmer.canUse('attack') &&
        gameState.coopTargetMonster &&
        farmer.ctype !== 'warrior'
      ) {
        const distance = AL.Tools.distance(
          { x: farmer.x, y: farmer.y },
          {
            x: gameState.coopTargetMonster.monster.x,
            y: gameState.coopTargetMonster.monster.y,
          },
        )

        if (distance > farmer.range) {
          await farmer
            .smartMove(gameState.coopTargetMonster.monster)
            .catch(err => console.log(err))
        }

        if (distance < farmer.range) {
          await farmer
            .basicAttack(gameState.coopTargetMonster.monster.id)
            .catch(err => {
              console.log(err)
            })
        }
      }
    }

    await sleep(50) /* Wait a bit until the next attack */
  }
}

export default coopAttackLoop
