import { parseInput } from '../utils';

let fishMap = new Map<number, number>();

for (const fish of parseInput()[0].split(',').map(Number)) {
  if (!fishMap.has(fish)) {
    fishMap.set(fish, 0);
  }
  fishMap.set(fish, fishMap.get(fish)! + 1);
}
for (let i = 0; i < 256; i++) {
  const newFishMap = new Map<number, number>();
  for (const [fishDays, fishCount] of fishMap.entries()) {
    if (fishDays === 0) {
      newFishMap.set(6, (newFishMap.get(6) || 0) + fishCount);
      newFishMap.set(8, fishCount);
    } else {
      newFishMap.set(
        fishDays - 1,
        (newFishMap.get(fishDays - 1) || 0) + fishCount,
      );
    }
  }
  fishMap = newFishMap;
}

console.log(
  [...fishMap.values()].reduce((sum, fishCount) => sum + fishCount, 0),
);
