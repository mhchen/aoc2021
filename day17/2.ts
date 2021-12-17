import { parseInput } from '../utils';

const line = parseInput()[0];

const [, minX, maxX, minY, maxY] =
  /target area: x=(-?\d+)..(-?\d+), y=(-?\d+)..(-?\d+)/.exec(line)!.map(Number);

function willHitTarget(initialXVelocity: number, initialYVelocity: number) {
  let x = 0;
  let y = 0;
  let xVelocity = initialXVelocity;
  let yVelocity = initialYVelocity;
  while (true) {
    x += xVelocity;
    y += yVelocity;
    if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
      return true;
    }
    if (y < minY || x > maxX) {
      return false;
    }
    if (xVelocity > 0) {
      xVelocity--;
    }
    yVelocity--;
  }
}
const velocities: string[] = [];
for (let x = 0; x < 1000; x++) {
  for (let y = -1000; y < 1000; y++) {
    if (willHitTarget(x, y)) {
      velocities.push(`${x},${y}`);
    }
  }
}
console.log(velocities.length);
