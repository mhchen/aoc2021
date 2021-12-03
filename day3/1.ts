import { parseInput } from '../utils';

const lines = parseInput();

type Tally = {
  zeroes: number;
  ones: number;
};

const tallies: Tally[] = [];

for (const line of lines) {
  for (let i = 0; i < line.length; i++) {
    tallies[i] = tallies[i] || {
      zeroes: 0,
      ones: 0,
    };

    if (line[i] === '0') {
      tallies[i].zeroes++;
    } else {
      tallies[i].ones++;
    }
  }
}

const mostCommonBinaryDigits: number[] = [];
const leastCommonBinaryDigits: number[] = [];
for (const { zeroes, ones } of tallies) {
  mostCommonBinaryDigits.push(zeroes > ones ? 0 : 1);
  leastCommonBinaryDigits.push(zeroes > ones ? 1 : 0);
}

console.log(
  parseInt(leastCommonBinaryDigits.join(''), 2) *
    parseInt(mostCommonBinaryDigits.join(''), 2),
);
