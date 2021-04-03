import {Character} from 'alclient'
import sleep from 'utils/sleep'

async function chestLoop(farmers: Character[]): Promise<void> {
  while (true) {
    for (const farmer of farmers) {
      farmer.chests.forEach(async chest => {
        await farmer.openChest(chest.id).catch(() => {
          console.log('chest open fail')
        })
      })
    }

    await sleep(1000) /* Wait a bit until the next attack */
  }
}

export default chestLoop
