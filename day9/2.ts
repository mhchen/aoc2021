import { Grid, parseInput } from '../utils';

const lines = parseInput();

const grid = new Grid<number>();

for (const [y, line] of lines.entries()) {
  for (const [x, heightString] of line.split('').entries()) {
    grid.set(x, y, Number(heightString));
  }
}

const totalRisk = 0;

function scoutBasin(
  x: number,
  y: number,
  lastHeight: number,
  visited = new Set<string>(),
): Set<string> {
  const key = `${x},${y}`;
  if (visited.has(key)) {
    return visited;
  }
  const height = grid.get(x, y);

  if (height == null || height === 9 || height < lastHeight) {
    return visited;
  }

  visited.add(key);

  return new Set([
    ...scoutBasin(x + 1, y, height, visited),
    ...scoutBasin(x - 1, y, height, visited),
    ...scoutBasin(x, y + 1, height, visited),
    ...scoutBasin(x, y - 1, height, visited),
  ]);
}

const basinSizes: number[] = [];

for (let y = grid.minY; y <= grid.maxY; y++) {
  outer: for (let x = grid.minX; x <= grid.maxX; x++) {
    const height = grid.get(x, y)!;

    const adjacentHeights = [
      grid.get(x + 1, y),
      grid.get(x - 1, y),
      grid.get(x, y + 1),
      grid.get(x, y - 1),
    ];

    for (const adjacentHeight of adjacentHeights) {
      if (adjacentHeight != null && adjacentHeight <= height) {
        continue outer;
      }
    }
    basinSizes.push(scoutBasin(x, y, -Infinity).size);
  }
}

basinSizes.sort((a, b) => a - b);

console.log(
  basinSizes.slice(-3).reduce((accumulator, value) => accumulator * value, 1),
);
