import { Grid, parseInput } from '../utils';

const lines = parseInput();

const grid = new Grid<number>();

for (const [y, line] of lines.entries()) {
  for (const [x, char] of line.split('').entries()) {
    grid.set(x, y, Number(char));
  }
}

let step = 0;

while (true) {
  const hasFlashed = new Set<string>();
  let toFlash = new Set<string>();

  const increment = (x: number, y: number) => {
    const key = `${x},${y}`;
    if (hasFlashed.has(key)) {
      return;
    }
    const afterValue = grid.get(x, y)! + 1;
    if (afterValue > 9) {
      toFlash.add(key);
      hasFlashed.add(key);
    }
    grid.set(x, y, afterValue);
  };

  for (const { x, y } of grid) {
    increment(x, y);
  }

  while (toFlash.size) {
    const toFlashArray = [...toFlash];
    toFlash = new Set();
    for (const [flashX, flashY] of toFlashArray.map((coord) =>
      coord.split(',').map(Number),
    )) {
      for (const { x, y } of grid.adjacent(flashX, flashY)) {
        increment(x, y);
      }
    }
  }
  for (const [x, y] of [...hasFlashed].map((coord) =>
    coord.split(',').map(Number),
  )) {
    grid.set(x, y, 0);
  }
  step++;
  if (hasFlashed.size === grid.size()) {
    console.log(step);
    break;
  }
}
