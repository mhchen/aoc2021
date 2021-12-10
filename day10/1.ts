import { parseInput } from '../utils';

const lines = parseInput();

const openChars = new Set(['(', '[', '{', '<']);
const closeChars = new Set([')', ']', '}', '>']);

const openCloseMatches: Record<string, string> = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<',
};

const pointValues: Record<string, number> = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

let totalScore = 0;
for (const line of lines) {
  const stack = [];
  for (const char of line.split('')) {
    if (openChars.has(char)) {
      stack.push(char);
      continue;
    }
    const lastOpenChar = stack.pop();
    if (lastOpenChar !== openCloseMatches[char]) {
      totalScore += pointValues[char];
      break;
    }
  }
}

console.log(totalScore);
