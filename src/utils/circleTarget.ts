//TODO convert to ts and optimize
// function circleTarget(target) {

//     if (target) {

//         const minTargetDist = target.range * 1.5;
//         const targetDistance = distance(character, target);
//         let offset = 1;

//         if (!get(character.name + "Offset")) {
//             set(character.name + "Offset", 1);
//         } else {
//             offset = Number(get(character.name + "Offset"));
//             offset += 0.7;
//             if (offset >= 999999) offset = 1;
//             set(character.name + "Offset", offset);
//         }
//         if (targetDistance < minTargetDist) {
//             xmove(
//                 target.x + (minTargetDist * Math.sin(offset)),
//                 target.y + (minTargetDist * Math.cos(offset))
//             );
//         }
//     }
// }
