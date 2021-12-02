import { parseInput } from '../utils';

interface Command {
  direction: string;
  units: number;
}

interface Position {
  horizontal: number;
  depth: number;
  aim: number;
}

const commands: Command[] = parseInput().map((line) => {
  const tokens = line.split(' ');
  return {
    direction: tokens[0],
    units: Number(tokens[1]),
  };
});

const finalPosition = commands.reduce(
  ({ horizontal, depth, aim }, { direction, units }) => {
    let aimChange = 0;
    if (direction === 'down') {
      aimChange = units;
    } else if (direction === 'up') {
      aimChange = -units;
    }
    return {
      horizontal: horizontal + (direction === 'forward' ? units : 0),
      depth: depth + (direction === 'forward' ? units * aim : 0),
      aim: aim + aimChange,
    };
  },
  {
    horizontal: 0,
    depth: 0,
    aim: 0,
  } as Position,
);

console.log(finalPosition.depth * finalPosition.horizontal);
