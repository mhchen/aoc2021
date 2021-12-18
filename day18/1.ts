import { parseInput } from '../utils';

const lines = parseInput();
type Pair = [Pair | number, Pair | number];

function findExplodableOuterPair(
  pair: Pair,
  depth = 0,
): { outerPair: Pair; index: number } | null {
  const [innerPair1, innerPair2] = pair;
  if (depth === 3) {
    if (Array.isArray(innerPair1)) {
      return {
        outerPair: pair,
        index: 0,
      };
    }
    if (Array.isArray(innerPair2)) {
      return {
        outerPair: pair,
        index: 1,
      };
    }
    return null;
  }
  return (
    (Array.isArray(innerPair1) &&
      findExplodableOuterPair(innerPair1, depth + 1)) ||
    (Array.isArray(innerPair2) &&
      findExplodableOuterPair(innerPair2, depth + 1)) ||
    null
  );
}

function getOtherIndex(index: number) {
  return index === 0 ? 1 : 0;
}

function maybeExplode(pair: Pair) {
  const explodableOuterPair = findExplodableOuterPair(pair);
  if (explodableOuterPair) {
    const { outerPair, index } = explodableOuterPair;
    const innerPair = outerPair[index] as [number, number];
    const otherIndex = getOtherIndex(index);
    outerPair[otherIndex] =
      innerPair[otherIndex] + (outerPair[otherIndex] as number);
    outerPair[index] = 0;
    return true;
  }
  return false;
}

for (const line of lines) {
  const array = eval(line) as Pair;
  console.log(maybeExplode(array));
  console.log(JSON.stringify(array));
}
