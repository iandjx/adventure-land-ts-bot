//TODO Refactor to TS and optimize
// function handleHuntQuest() {
//   let monsterType
//   let huntedMonsters
//   if (hunterToggle) {
//     //Get the quest
//     if (!character.s.monsterhunt) {
//       log('Getting new hunterQuest')
//       smart_move({to: 'monsterhunter'}, () => {
//         parent.socket.emit('monsterhunt')
//         updateFarmingSpot()
//       })
//       //If character has a quest, handle it
//     } else if (character.s.monsterhunt) {
//       monsterType = character.s.monsterhunt.id
//       huntedMonsters = get('huntedMonsters') || []
//       //Check if quest can be pursued
//       if (character.s.monsterhunt.c > 0) {
//         let alreadyAdded
//         huntedMonsters.forEach(element => {
//           if (element.questGiver === character.name) alreadyAdded = true
//         })
//         if (allowedMonsters.includes(monsterType) && !alreadyAdded) {
//           huntedMonsters.unshift({
//             monsterType: monsterType,
//             questGiver: character.name,
//             timeStamp: Date.now() + character.s.monsterhunt.ms,
//           })
//           set('huntedMonsters', huntedMonsters)
//           log('Setting HunterQuest in locStor')
//         }
//       }
//       //Turn in fulfilled quest
//       if (character.s.monsterhunt.c === 0) {
//         log('Fulfilled Hunter Quest')
//         smart_move({to: 'monsterhunter'}, () => {
//           //Remove fulfilled quest from localStorage
//           huntedMonsters.forEach((element, index) => {
//             if (element.questGiver === character.name) {
//               huntedMonsters.splice(index, 1)
//             }
//           })
//           set('huntedMonsters', huntedMonsters)
//           //Turn in quest
//           parent.socket.emit('monsterhunt')
//           //Get new quest
//           parent.socket.emit('monsterhunt')
//           //Update farming spot
//           updateFarmingSpot()
//         })
//       }
//       //Remove quests older than 30 minutes
//       huntedMonsters.forEach((element, index) => {
//         if (element.timeStamp && Date.now() > element.timeStamp) {
//           huntedMonsters.splice(index, 1)
//           set('huntedMonsters', huntedMonsters)
//           log('Deleted old quest from LocStor')
//         }
//       })
//     }
//   }
// }
