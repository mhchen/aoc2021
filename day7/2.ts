import { parseInput } from '../utils';

const positions = parseInput()[0].split(',').map(Number);

const minPosition = Math.min(...positions);
const maxPosition = Math.max(...positions);

function computeSummation(number: number) {
  return (number ** 2 + number) / 2;
}

let minFuel = Infinity;
for (let i = minPosition; i < maxPosition; i++) {
  const totalFuel = positions.reduce((sum, position) => {
    return sum + computeSummation(Math.abs(position - i));
  }, 0);
  if (totalFuel < minFuel) {
    minFuel = totalFuel;
  }
}
console.log(minFuel);
