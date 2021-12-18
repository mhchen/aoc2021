import { Grid, parseInput } from '../utils';

const lines = parseInput();

interface Node {
  x: number;
  y: number;
  visited: boolean;
  distance: number;
}

function createKey(x: number, y: number) {
  return `${x},${y}`;
}

const nodeMap = new Map<string, Node>();
const grid = new Grid<number>();

for (const [y, line] of lines.entries()) {
  for (const [x, riskLevelString] of [...line].entries()) {
    grid.set(x, y, Number(riskLevelString));
    nodeMap.set(createKey(x, y), {
      x,
      y,
      visited: false,
      distance: Infinity,
    });
  }
}
nodeMap.get('0,0')!.distance = 0;
let node = nodeMap.get('0,0');
while (true) {
  const { x, y } = node!;
  const key = createKey(x, y);
  const { distance } = nodeMap.get(key)!;

  for (const { x: innerX, y: innerY } of [
    {
      x: x + 1,
      y,
    },
    {
      x: x - 1,
      y,
    },
    {
      x,
      y: y + 1,
    },
    {
      x,
      y: y - 1,
    },
  ]) {
    const innerKey = createKey(innerX, innerY);
    const innerNode = nodeMap.get(innerKey);
    if (!innerNode) {
      continue;
    }

    const nextDistance = Math.min(
      distance + grid.get(innerX, innerY)! || Infinity,
      innerNode.distance,
    );
    innerNode.distance = nextDistance;
  }

  let currentMinNode: Node | null = null;

  for (const innerNode of nodeMap.values()) {
    if (innerNode.distance < (currentMinNode?.distance || Infinity)) {
      currentMinNode = innerNode;
    }
  }
  if (currentMinNode!.x === grid.maxX && currentMinNode!.y === grid.maxY) {
    break;
  }

  node!.visited = true;
  console.log(node!.x, node!.y);
  node = currentMinNode!;
}

console.log(node);
