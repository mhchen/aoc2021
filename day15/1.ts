import { Grid, parseInput } from '../utils';

const lines = parseInput();

const grid = new Grid<number>();

for (const [y, line] of lines.entries()) {
  for (const [x, riskLevelString] of [...line].entries()) {
    grid.set(x, y, Number(riskLevelString));
  }
}
let isFirst = true;

let currentLowestRisk = Infinity;

const visited = new Set<string>();
const distances: Record<string, number> = {};

function getDistance(x: number, y: number) {
  const 
}

function traverse(
  x: number,
  y: number,
  oldRisk = 0,
  oldVisited: Set<string> = new Set(),
): number | null {
  const key = `${x},${y}`;
  const distance = distances[key] ?? Infinity;
  const rightKey = `${x + 1},${y}`;
  const downKey = `${x},${y + 1}`;

  const rightDistance = Math.min(distances[rightKey] ?? Infinity);
  const downDistance = Math.min(distances[downKey] ?? Infinity);
  const down = traverse(x, y + 1, newRisk, visited);
  visited.add(key);

  const risk = grid.get(x, y);
  if (oldVisited.has(key) || risk == null) {
    return null;
  }
  const newRisk = oldRisk + (isFirst ? 0 : risk);
  if (newRisk > currentLowestRisk) {
    return null;
  }
  isFirst = false;

  if (x === grid.maxX && y === grid.maxY) {
    if (newRisk === 0) {
      throw new Error('New risk is 0');
    }
    console.log(newRisk);
    return newRisk;
  }
  const directions: (number | null)[] = [];
  if (right) {
    directions.push(right);
  }
  if (down) {
    directions.push(down);
  }
  const lowestRisk = Math.min(...(directions as number[]));
  if (lowestRisk < currentLowestRisk) {
    currentLowestRisk = lowestRisk;
  }
  return lowestRisk;
}

console.log(traverse(0, 0));
