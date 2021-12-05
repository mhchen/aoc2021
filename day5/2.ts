import { Grid, parseInput } from '../utils';

const inputLines = parseInput();

interface Point {
  x: number;
  y: number;
}

interface Line {
  point1: Point;
  point2: Point;
}

function createPointFromPointString(pointString: string): Point {
  const [x, y] = pointString.split(',').map(Number);
  return {
    x,
    y,
  };
}

const lines: Line[] = inputLines.map((inputLine) => {
  const [point1String, point2String] = inputLine.split(' -> ');
  return {
    point1: createPointFromPointString(point1String),
    point2: createPointFromPointString(point2String),
  };
});

const grid = new Grid<number>();

for (const line of lines) {
  const minY = Math.min(line.point1.y, line.point2.y);
  const maxY = Math.max(line.point1.y, line.point2.y);
  const minX = Math.min(line.point1.x, line.point2.x);
  const maxX = Math.max(line.point1.x, line.point2.x);

  if (line.point1.x === line.point2.x) {
    for (let i = minY; i <= maxY; i++) {
      const { x } = line.point1;
      const y = i;
      grid.set(x, y, (grid.get(x, y) || 0) + 1);
    }
    continue;
  }

  if (line.point1.y === line.point2.y) {
    for (let i = minX; i <= maxX; i++) {
      const { y } = line.point1;
      const x = i;
      grid.set(x, y, (grid.get(x, y) || 0) + 1);
    }
    continue;
  }

  if (
    (line.point1.y > line.point2.y && line.point1.x > line.point2.x) ||
    (line.point1.y < line.point2.y && line.point1.x < line.point2.x)
  ) {
    let x = minX;
    let y = minY;
    while (x <= maxX && y <= maxY) {
      grid.set(x, y, (grid.get(x, y) || 0) + 1);
      x++;
      y++;
    }
    continue;
  }

  let x = minX;
  let y = maxY;
  while (x <= maxX && y >= minY) {
    grid.set(x, y, (grid.get(x, y) || 0) + 1);
    x++;
    y--;
  }
}

let intersectionCount = 0;
for (const point of grid) {
  if (point! > 1) {
    intersectionCount++;
  }
}

console.log(intersectionCount);
