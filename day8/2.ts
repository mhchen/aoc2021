import { parseInput } from '../utils';

const lines = parseInput();

let uniqueSegmentCount = 0;

interface ActivatedSegments {
  top: boolean;
  topRight: boolean;
  topLeft: boolean;
  center: boolean;
  bottomLeft: boolean;
  bottomRight: boolean;
  bottom: boolean;
}


function decodeInput(input: string[]) {
  for (const inputString of input) {
    switch (inputString.length) {
      case 4:

    }
  }
}

for (const line of lines) {
  const [, outputTokens] = line.split(' | ');
  for (const output of outputTokens.split(' ')) {
    if ([4, 2, 3, 7].includes(output.length)) {
      uniqueSegmentCount++;
    }
  }
}

console.log(uniqueSegmentCount);
