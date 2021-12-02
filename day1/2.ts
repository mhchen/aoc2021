import { parseInput } from '../utils';

const readings = parseInput().map(Number);

let lastWindowSum = Infinity;
let increasesCount = 0;
for (const i of readings.keys()) {
  if (readings[i + 2] == null) {
    break;
  }

  const windowSum = readings[i] + readings[i + 1] + readings[i + 2];
  if (windowSum > lastWindowSum) {
    increasesCount++;
  }
  lastWindowSum = windowSum;
}

console.log(increasesCount);
