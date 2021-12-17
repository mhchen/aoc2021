import { parseInput } from '../utils';

const line = parseInput()[0];

const [, minX, maxX, minY, maxY] =
  /target area: x=(-?\d+)..(-?\d+), y=(-?\d+)..(-?\d+)/.exec(line)!.map(Number);

function calculateHighestHeight(initialTrajectory: number) {
  let position = 0;
  let trajectory = initialTrajectory;
  const positions: number[] = [];
  let isValid = false;
  while (true) {
    position += trajectory;
    positions.push(position);
    if (position >= minY && position <= maxY) {
      isValid = true;
    }
    if (position < minY) {
      break;
    }
    trajectory--;
  }
  if (!isValid) {
    return null;
  }
  return Math.max(...positions);
}
const heights: number[] = [];
for (let i = 0; i < 1000; i++) {
  const highestHeight = calculateHighestHeight(i);
  if (highestHeight != null) {
    heights.push(highestHeight);
  }
}
console.log(Math.max(...heights));
