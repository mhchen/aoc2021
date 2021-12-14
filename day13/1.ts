import { Grid, parseInput } from '../utils';

const lines = parseInput();

let parsingInstructions = false;

interface Coordinates {
  x: number;
  y: number;
}

interface Instruction {
  direction: 'x' | 'y';
  axis: number;
}

const instructions: Instruction[] = [];
let grid = new Grid<string>();

for (const line of lines) {
  if (line === '') {
    parsingInstructions = true;
    continue;
  }

  if (parsingInstructions) {
    const [, direction, axisString] = /^fold along (x|y)=(\d+)$/.exec(line)!;
    instructions.push({
      direction: direction as 'x' | 'y',
      axis: Number(axisString),
    });
  }

  const [x, y] = line.split(',').map(Number);
  grid.set(x, y, '#');
}

function fold(instruction: Instruction) {
  const newGrid = new Grid<string>();
  if (instruction.direction === 'y') {
    for (let x = grid.minX; x <= grid.maxX; x++) {
      for (let y = grid.minY; y < instruction.axis; y++) {
        const newValue =
          grid.get(x, y) || grid.get(x, (instruction.axis - y) * 2 + y);
        newGrid.set(x, y, newValue as string);
      }
    }
  } else {
    for (let x = grid.minX; x < instruction.axis; x++) {
      for (let y = grid.minY; y <= grid.maxY; y++) {
        const newValue =
          grid.get(x, y) || grid.get((instruction.axis - x) * 2 + x, y);
        newGrid.set(x, y, newValue as string);
      }
    }
  }
  grid = newGrid;
}

for (const instruction of instructions) {
  fold(instruction);
  break;
}

let count = 0;
for (const { value } of grid) {
  if (value === '#') {
    count++;
  }
}
console.log(count);
