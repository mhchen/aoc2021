import { parseInput } from '../utils';

const lines = parseInput();

function containsSegments(outer: string, inner: string) {
  const outerSet = new Set(outer.split(''));
  const innerSet = new Set(inner.split(''));
  for (const char of innerSet) {
    if (!outerSet.has(char)) {
      return false;
    }
  }
  return true;
}

let sum = 0;

for (const line of lines) {
  const [inputTokens, outputTokens] = line.split(' | ');
  const transformedInputs = inputTokens
    .split(' ')
    .map((input) => input.split('').sort().join(''));

  const transformedOutputs = outputTokens
    .split(' ')
    .map((output) => output.split('').sort().join(''));

  const inputsByLength: Record<number, string[]> = {};

  for (const input of transformedInputs) {
    inputsByLength[input.length] = inputsByLength[input.length] || [];
    inputsByLength[input.length].push(input);
  }

  const inputToDigitMap: Record<string, number> = {};
  const digitToInputMap: Record<number, string> = {};

  /* eslint-disable prefer-destructuring */
  inputToDigitMap[inputsByLength[2][0]] = 1;
  digitToInputMap[1] = inputsByLength[2][0];
  inputToDigitMap[inputsByLength[3][0]] = 7;
  digitToInputMap[7] = inputsByLength[3][0];
  inputToDigitMap[inputsByLength[4][0]] = 4;
  digitToInputMap[4] = inputsByLength[4][0];
  inputToDigitMap[inputsByLength[7][0]] = 8;
  digitToInputMap[8] = inputsByLength[7][0];
  /* eslint-enable prefer-destructuring */

  const sixSegments = inputsByLength[6];

  // if 6 segments and contains 4, it's 9
  // if 6 segments and contains 7, it's 0
  // else it's 6

  // if 5 segments and contains 7, it's 3
  // if 5 segments and contained by 6, it's 5
  // else it's 2

  while (sixSegments.length) {
    const input = sixSegments.pop()!;
    let digit: number;
    if (containsSegments(input, digitToInputMap[4])) {
      digit = 9;
    } else if (containsSegments(input, digitToInputMap[7])) {
      digit = 0;
    } else {
      digit = 6;
    }
    inputToDigitMap[input] = digit;
    digitToInputMap[digit] = input;
  }

  const fiveSegments = inputsByLength[5];
  while (fiveSegments.length) {
    const input = fiveSegments.pop()!;
    if (containsSegments(input, digitToInputMap[7])) {
      inputToDigitMap[input] = 3;
    } else if (containsSegments(digitToInputMap[6], input)) {
      inputToDigitMap[input] = 5;
    } else {
      inputToDigitMap[input] = 2;
    }
  }

  sum += Number(
    transformedOutputs.map((output) => inputToDigitMap[output]).join(''),
  );
}

console.log(sum);
