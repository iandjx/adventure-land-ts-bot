import {Character, Merchant} from 'alclient'
import sleep from 'utils/sleep'

async function respawnLoop(
  merchant: Merchant,
  farmers: Character[],
): Promise<void> {
  while (true) {
    for (const farmer of farmers) {
      if (merchant.rip) {
        merchant.respawn()
      }
      if (farmer.rip) {
        console.log(farmer.id, ' died respawning')
        farmer.respawn()
      }
    }

    await sleep(1000) /* Wait a bit until the next attack */
  }
}

export default respawnLoop
