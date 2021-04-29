import { Character } from 'alclient'
import sleep from '../utils/sleep'

async function getStatus(farmers: Character[]): Promise<void> {
  while (true) {
    for (const farmer of farmers) {
      console.log(farmer.id, ' status ')
      console.log('Max HP ', farmer.max_hp, 'Current HP', farmer.hp)
      console.log('Current Exp', farmer.xp)
      console.log('Current Level', farmer.level)
      console.log('target', farmer.target)
    }

    await sleep(5000)
  }
}

export default getStatus
