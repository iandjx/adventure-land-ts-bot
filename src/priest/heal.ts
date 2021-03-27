import {Character, Priest} from 'alclient'

export const healPartyMemberLoop = async (
  priest: Priest,
  members: Character[],
): Promise<void> => {
  while (true) {
    const maxHeal = priest.attack

    for (const member of members) {
      if (member.hp < member.max_hp - maxHeal && priest.canUse('heal')) {
        try {
          await priest.heal(member.id)
          console.log('healing ', member.id)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
}
