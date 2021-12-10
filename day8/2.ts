import { parseInput } from '../utils';

const lines = parseInput();

// const uniqueSegmentCount = 0;

// const segments = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g']);

// interface PotentialSegments {
// top: Set<string>;
// topRight: Set<string>;
// topLeft: Set<string>;
// const segmentsToDigits = new Map([
// bottom: Set<string>;
// bottomRight: Set<string>;
// bottomLeft: Set<string>;
// }

// function createPotentialSegments(): PotentialSegments {
// return {
// top: new Set(segments),
// topRight: new Set(segments),
// topLeft: new Set(segments),
// center: new Set(segments),
// bottom: new Set(segments),
// bottomRight: new Set(segments),
// bottomLeft: new Set(segments),
// };
// }

// function eliminate(
// potentialSegments: PotentialSegments,
// keys: (keyof PotentialSegments)[],
// letters: string[],
// ) {
// for (const key of keys) {
// for (const letter of letters) {
// potentialSegments[key].delete(letter);
// }
// }
// }

const segmentsToDigits = new Map([
  [6, [0, 6, 9]],
  [2, [1]],
  [3, [7]],
  [4, [4]],
  [5, [2, 3, 5]],
  [7, [8]],
]);

const digitsToSegments = new Map<number, number>();

for (const [segments, digits] of segmentsToDigits) {
  for (const digit of digits) {
    digitsToSegments.set(digit, segments);
  }
}

// const segmentLengthToEliminatedSegments: Record<
// number,
// (keyof PotentialSegments)[]
// > = {
// 4: ['top', 'bottomLeft', 'bottom'],
// 2: ['top', 'topLeft', 'center', 'bottomLeft', 'bottom'],
// 3: ['topLeft', 'center', 'bottomLeft', 'bottom'],
// };

function matchDigits(input: string[]) {
  const inputMap = {

  };
  const potentialSegments = segmentsToDigits.get(input.length);
  if (!potentialSegments) {
    return;
  }
  const potentialSegment = potentialSegments.pop();
  inputMap[input]
}

for (const line of lines) {
  const [inputTokens, outputTokens] = line.split(' | ');
  const digitMap = matchDigits(
    inputTokens.split(' ').map((input) => input.split('').sort().join('')),
  );
}
