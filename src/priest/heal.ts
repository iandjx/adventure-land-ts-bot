import {Priest, Character} from 'alclient'
import {getDistance} from 'utils/getDistance'
import sleep from '../utils/sleep'

async function healLoop(
  priest: Priest,
  farmers: Character[],
): Promise<boolean> {
  const maxHeal = priest.attack
  while (true) {
    for (const member of farmers) {
      try {
        if (member.hp <= member.max_hp - maxHeal) {
          console.log(member.id, ' needs healing. current hp ', member.hp)

          if (getDistance(priest, member) > priest.range) {
            await priest.smartMove({x: member.x, y: member.y})
            return true
          }
          const cooldown = priest.getCooldown('attack')
          if (cooldown > 0) await sleep(cooldown) // Wait for attack to become ready

          await priest.heal(member.id).catch(err => console.log(err))
          console.log(member.id, ' healed for ', maxHeal)
          return false
        }
      } catch (e) {
        console.error(e)
      }
    }

    await sleep(2000) /* Wait a bit until the next regen */
  }
}

export default healLoop
