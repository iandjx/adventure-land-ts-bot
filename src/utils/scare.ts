//TODO Refactor scare script and optimize
//Scare Monster away if HP are low
// function scareMonsters() {
//   const mainOrb = 'orbg'
//   const rareMonsters = ['greenjr', 'grinch']
//   if (
//     get_nearest_monster({target: character.name}) &&
//     //If the attacking monster isn't farmed, scare it away immediately...
//     ((get_nearest_monster({target: character.name}).mtype !== farmMonsterType &&
//       //...except if it's a rare monster
//       !rareMonsters.includes(
//         get_nearest_monster({target: character.name}).mtype,
//       )) ||
//       //...or if the character is a merchant
//       character.ctype === 'merchant' ||
//       //If the HP are lower that the monster's attack times 3,
//       //or if the characters HP are below 30%
//       //or if the characters MP are low
//       character.hp <=
//         get_nearest_monster({target: character.name}).attack * 3 ||
//       character.hp <= character.max_hp / 3 ||
//       character.mp <= character.max_mp / 3 ||
//       character.mp <= G.skills.scare.mp * 5) &&
//     character.mp >= G.skills.scare.mp &&
//     !is_on_cooldown('scare')
//   ) {
//     if (character.slots.orb?.name !== 'jacko' && locate_item('jacko') !== -1)
//       equip(locate_item('jacko'))
//     use_skill('scare')
//     game_log('Scared monsters')
//     //Stop attacking monsters
//     attackToggle = false
//     //Equip main Orb
//   } else if (
//     character.hp > character.max_hp / 3 &&
//     character.mp > G.skills.scare.mp * 5 &&
//     character.slots.orb?.name === 'jacko' &&
//     locate_item(mainOrb) !== -1
//   ) {
//     equip(locate_item(mainOrb))
//   }
// }
