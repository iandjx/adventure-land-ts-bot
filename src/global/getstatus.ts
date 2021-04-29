import { Character } from 'alclient'
import sleep from '../utils/sleep'

async function getStatus(farmers: Character[]): Promise<void> {
  while (true) {
    for (const farmer of farmers) {
      console.log(farmer.id, ' status ')
      console.log('Max HP ', farmer.max_hp, 'Current HP', farmer.hp)
      console.log('Current Exp', farmer.xp)
      console.log('Current Level', farmer.level)
      console.log('huntiung', farmer.s.monsterhunt)
      console.log('target', farmer.target)
      console.log('farmer', farmer.targets)
    }

    await sleep(10000)
  }
}

export default getStatus
