import { parseInput } from '../utils';

interface Command {
  direction: string;
  units: number;
}

interface Position {
  horizontal: number;
  depth: number;
}

const commands: Command[] = parseInput().map((line) => {
  const tokens = line.split(' ');
  return {
    direction: tokens[0],
    units: Number(tokens[1]),
  };
});

const finalPosition = commands.reduce(
  ({ horizontal, depth }, { direction, units }) => {
    let depthChange = 0;
    if (direction === 'down') {
      depthChange = units;
    } else if (direction === 'up') {
      depthChange = -units;
    }
    return {
      horizontal: horizontal + (direction === 'forward' ? units : 0),
      depth: depth + depthChange,
    };
  },
  {
    horizontal: 0,
    depth: 0,
  } as Position,
);

console.log(finalPosition.depth * finalPosition.horizontal);
