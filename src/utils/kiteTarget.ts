//TODO convert to ts and optimize
// function kiteTarget(target) {
//   if (target) {
//     const minTargetDist = target.range * 1.1
//     const kiteFlip = target.range * 0.5
//     const targetDistance = distance(character, target)

//     if (targetDistance < minTargetDist && targetDistance > kiteFlip) {
//       xmove(
//         character.real_x + (character.real_x - target.x),
//         character.real_y + (character.real_y - target.y),
//       )
//     }
//     if (distance(character, target) < kiteFlip) {
//       xmove(
//         character.real_x - (character.real_x - target.x) + minTargetDist,
//         character.real_y - (character.real_y - target.y) + minTargetDist,
//       )
//     }
//   }
// }

// export default kiteTarget
