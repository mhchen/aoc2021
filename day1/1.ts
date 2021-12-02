import { parseInput } from '../utils';

const readings = parseInput().map(Number);

let lastReading = Infinity;
let increasesCount = 0;
for (const reading of readings) {
  if (reading > lastReading) {
    increasesCount++;
  }

  lastReading = reading;
}

console.log(increasesCount);
