//NOTE Calculate difficulty is erroneous because it will return hard monsters with low hp but high evasion. Need to change logic for this function
import {Character} from 'alclient'
import * as AL from 'alclient'

export function calculate_difficulty(
  target: AL.GMonster,
  character: Character,
): number {
  // eslint-disable-next-line prefer-const
  let mdps = target.attack * target.frequency,
    dps = 4000,
    hp = 8000,
    mhp = target.hp

  if (character)
    (dps = character.attack * character.frequency), (hp = character.hp)
  for (let i = 0; i < 30; i++) {
    hp -= mdps * 2
    mhp -= dps * 2
    hp += 400
    if (hp < 0 || mhp < 0) break
  }
  if (hp < 0) return 2
  else if (
    (character && character.hp - hp > character.max_hp * 0.3) ||
    (!character && 6000 - hp > 8000 * 0.3)
  )
    return 1
  else return 0
}

// const monsters = AL.Game.G.monsters
// const monsterArray = Object.values(monsters)
// console.log(monsterArray)
// const easyMonsters = monsterArray.filter(
//   monster => calculate_difficulty(monster, farmer) === 0,
// )
// const lowhpmonsters = easyMonsters.filter(monster => monster.hp < 5000)
// console.log(easyMonsters)

// const bestMontser = lowhpmonsters.reduce((prev, current) => {
//   return prev.xp > current.xp ? prev : current
// })
// console.log(bestMontser)
// loop through all monsters
// get all monsters with difficulty 0
//

//   const max = data.reduce(function(prev, current) {
//     return (prev.y > current.y) ? prev : current
// }) //returns object
