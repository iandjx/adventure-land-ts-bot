import {Character, Priest} from 'alclient'
import sleep from 'utils/sleep'
import GameState from './gameState'

async function attackLoop(
  farmers: Character[],
  gameState: GameState,
): Promise<void> {
  while (true) {
    for (const farmer of farmers) {
      try {
        if (farmer instanceof Priest && gameState.healState === 'healing') {
          continue
        }
        if (!!gameState.goldSender && farmer.id === gameState.goldSender.id) {
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

export default attackLoop
