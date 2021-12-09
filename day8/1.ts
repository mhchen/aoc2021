import { parseInput } from '../utils';

const lines = parseInput();

let uniqueSegmentCount = 0;
for (const line of lines) {
  const [, outputTokens] = line.split(' | ');
  for (const output of outputTokens.split(' ')) {
    if ([4, 2, 3, 7].includes(output.length)) {
      uniqueSegmentCount++;
    }
  }
}

console.log(uniqueSegmentCount);
