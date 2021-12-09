import { Grid, parseInput } from '../utils';

const lines = parseInput();

const grid = new Grid<number>();

for (const [y, line] of lines.entries()) {
  for (const [x, heightString] of line.split('').entries()) {
    grid.set(x, y, Number(heightString));
  }
}

let totalRisk = 0;
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
    totalRisk += height + 1;
  }
}

console.log(totalRisk);
