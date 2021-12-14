import { parseInput } from '../utils';

const lines = parseInput();

let template = lines.shift()!;
lines.shift();

interface Rule {
  pair: string;
  element: string;
}

const ruleMap: Record<string, string> = lines.reduce((acc, line) => {
  const [pair, element] = line.split(' -> ');
  acc[pair] = element;
  return acc;
}, {} as Record<string, string>);

const steps = 40;
for (let j = 0; j < steps; j++) {
  const newStringArray = [template[0]];
  for (let i = 0; i < template.length - 1; i++) {
    const slice = template.slice(i, i + 2);
    newStringArray.push(ruleMap[slice]);
    newStringArray.push(slice[1]);
  }
  template = newStringArray.join('');
}

const charMap: Record<string, number> = {};
for (const char of template) {
  charMap[char] = charMap[char] || 0;
  charMap[char]++;
}

let min = Infinity;
let max = -Infinity;
for (const count of Object.values(charMap)) {
  if (count < min) {
    min = count;
  }
  if (count > max) {
    max = count;
  }
}

console.log(max - min);
