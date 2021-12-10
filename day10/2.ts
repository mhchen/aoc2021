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
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
};

const scores: number[] = [];
outer: for (const line of lines) {
  const stack = [];

  for (const char of line.split('')) {
    if (openChars.has(char)) {
      stack.push(char);
      continue;
    }
    const lastOpenChar = stack.pop();
    if (lastOpenChar !== openCloseMatches[char]) {
      continue outer;
    }
  }

  let totalScore = 0;
  while (stack.length) {
    const char = stack.pop();
    totalScore = totalScore * 5 + pointValues[char!];
  }
  scores.push(totalScore);
}

scores.sort((a, b) => a - b);

console.log(scores[Math.floor(scores.length / 2)]);
