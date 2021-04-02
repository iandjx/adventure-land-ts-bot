import {Character} from 'alclient'

export const getDistance = (
  characterA: Character,
  characterB: Character,
): number => {
  return distance_to_point(
    characterA.x,
    characterA.y,
    characterB.x,
    characterB.y,
  )
}

// we take the x and y coordinates of a point, and compare it to another point
// we can then derive the distance between two points
function distance_to_point(x1: number, y1: number, x2: number, y2: number) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}
