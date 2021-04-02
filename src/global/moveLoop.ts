// import {Character, Priest} from 'alclient'
// import sleep from 'utils/sleep'

// async function moveLoop(
//   healState: boolean,
//   farmers: Character[],
// ): Promise<void> {
//   while (true) {
//     for (const farmer of farmers) {
//       try {
//         if (healState === true) {
//           if (farmer instanceof Priest) {
//             continue
//           }
//         }

//         if (farmer.id === farmerToSendGoldFrom) {
//           continue
//         }
//         // console.log('Finding nearest crab to move to')
//         const nearestGoo = farmer.getNearestMonster('crab')
//         if (!nearestGoo) {
//           // Move to crab spawn
//           // console.log('Moing to crabs')
//           await farmer.smartMove('crab').catch(() => {
//             /* Empty to suppress messages */
//           })
//         } else if (nearestGoo.distance > farmer.range && !farmer.moving) {
//           console.log('Moving to nearest crab')
//           farmer.smartMove(nearestGoo.monster).catch(() => {
//             /* Empty to suppress messages */
//           })
//         }
//       } catch (e) {
//         // console.error(e)
//       }
//     }

//     await sleep(250) /* Wait a bit until the next move */
//   }
// }
