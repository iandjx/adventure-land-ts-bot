// const angleFromSpawnToBscorpionGoing = Math.atan2(
//   bscorpion.going_y - bscorpionSpawn.y,
//   bscorpion.going_x - bscorpionSpawn.x,
// )
// const endGoalAngle = angleFromSpawnToBscorpionGoing + Math.PI // Our goal is 180 degrees opposite
// const endGoal = {
//   x: bscorpionSpawn.x + RADIUS * Math.cos(endGoalAngle),
//   y: bscorpionSpawn.y + RADIUS * Math.sin(endGoalAngle),
// }

// const moveDistance = (ranger.speed * MOVE_TIME_MS) / 1000
// const angleFromSpawnToRanger = Math.atan2(
//   ranger.y - bscorpionSpawn.y,
//   ranger.x - bscorpionSpawn.x,
// )
// const moveAngle = 2 * Math.asin((moveDistance * 0.5) / RADIUS)
// const moveGoal1 = {
//   x: bscorpionSpawn.x + RADIUS * Math.cos(angleFromSpawnToRanger + moveAngle),
//   y: bscorpionSpawn.y + RADIUS * Math.sin(angleFromSpawnToRanger + moveAngle),
// }
// const moveGoal2 = {
//   x: bscorpionSpawn.x + RADIUS * Math.cos(angleFromSpawnToRanger - moveAngle),
//   y: bscorpionSpawn.y + RADIUS * Math.sin(angleFromSpawnToRanger - moveAngle),
// }
// const moveGoal1Distance = AL.Tools.distance(moveGoal1, endGoal)
// const moveGoal2Distance = AL.Tools.distance(moveGoal2, endGoal)
// if (moveGoal1Distance > moveGoal2Distance) {
//   ranger.move(moveGoal2.x, moveGoal2.y).catch(() => {
//     /* Ignore Errors */
//   })
// } else {
//   ranger.move(moveGoal1.x, moveGoal1.y).catch(() => {
//     /* Ignore Errors */
//   })
// }
