import {Character, Priest} from 'alclient'
import sleep from 'utils/sleep'

async function regenLoop(farmers: Character[]): Promise<void> {
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

export default regenLoop
