import fs from 'fs';

const lines = fs.readFileSync(`${__dirname}/input`, 'utf-8').split('\n');
const readings = lines.map(Number);

let lastReading = Infinity;
let increasesCount = 0;
for (const reading of readings) {
  if (reading > lastReading) {
    increasesCount++;
  }

  lastReading = reading;
}

console.log(increasesCount);
