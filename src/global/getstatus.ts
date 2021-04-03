import {Character} from 'alclient'
import sleep from '../utils/sleep'

async function getStatus(farmers: Character[]): Promise<void> {
  while (true) {
    try {
      for (const farmer of farmers) {
        console.log(farmer.id, ' status ')
        console.log('Max HP ', farmer.max_hp, 'Current HP', farmer.hp)
        console.log('ccurent exp', farmer.xp)
      }
    } catch (error) {
      console.log(error)
    }

    await sleep(10000)
  }
}

export default getStatus
