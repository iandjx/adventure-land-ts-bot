import { Character, Priest } from 'alclient'
import sleep from 'utils/sleep'
import GameState from './gameState'

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

    if (gameState.coopTargetMonster) {
      console.log(gameState.coopTargetMonster.monster.id)
    }

    for (const farmer of farmers) {
      if (farmer instanceof Priest && gameState.healState === 'healing') {
        continue
      }
      if (!!gameState.goldSender && farmer.id === gameState.goldSender.id) {
        continue
      }

      if (!farmer.s.monsterhunt) {
        continue
      }

      const cooldown = farmer.getCooldown('attack')
      if (cooldown > 0) await sleep(cooldown) // Wait for attack to become ready

      if (farmer.canUse('attack') && farmer.ctype === 'warrior') {
        const attackableGoo = farmer.getNearestMonster('squig')
        gameState.coopTargetMonster = attackableGoo

        if (attackableGoo && attackableGoo.distance < farmer.range) {
          await farmer.basicAttack(attackableGoo.monster.id).catch(() => {
            /* Empty to suppress messages */
          })
        }
      }

      if (
        farmer.canUse('attack') &&
        gameState.coopTargetMonster &&
        farmer.ctype !== 'warrior'
      ) {
        console.log('attackble goo', gameState.coopTargetMonster.monster.id)
        if (gameState.coopTargetMonster.distance < farmer.range) {
          await farmer
            .basicAttack(gameState.coopTargetMonster.monster.id)
            .catch(() => {
              //supress error
            })
        }
      }
    }

    await sleep(50) /* Wait a bit until the next attack */
  }
}

export default coopAttackLoop
