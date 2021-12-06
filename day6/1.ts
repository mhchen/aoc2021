import { parseInput } from '../utils';

const fishes = parseInput()[0].split(',').map(Number);

for (let i = 0; i < 80; i++) {
  for (const [index, fish] of fishes.entries()) {
    if (fish === 0) {
      fishes[index] = 6;
      fishes.push(9);
    } else {
      fishes[index]--;
    }
  }
  console.log(i);
}

console.log(fishes.length);
