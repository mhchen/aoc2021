import { parseInput } from '../utils';

const lines = parseInput();

const template = lines.shift()!;
lines.shift();

interface Rule {
  pair: string;
  element: string;
  count: number;
}

let ruleMap = new Map<string, Rule>();

lines.forEach((line) => {
  const [pair, element] = line.split(' -> ');
  const rule = {
    pair,
    element,
    count: 0,
  };
  ruleMap.set(pair, rule);
});

for (let i = 0; i < template.length - 1; i++) {
  const slice = template.slice(i, i + 2);
  const rule = ruleMap.get(slice)!;
  rule.count++;
}

const steps = 40;
for (let i = 0; i < steps; i++) {
  const newRuleMap = new Map<string, Rule>();
  for (const [key, rule] of ruleMap.entries()) {
    newRuleMap.set(key, { ...rule, count: 0 });
  }

  for (const rule of ruleMap.values()) {
    if (rule.count) {
      const pair1 = `${rule.pair[0]}${rule.element}`;
      const pair2 = `${rule.element}${rule.pair[1]}`;
      newRuleMap.get(pair1)!.count += rule.count;
      newRuleMap.get(pair2)!.count += rule.count;
    }
  }
  ruleMap = newRuleMap;
}

const charMap: Record<string, number> = {};
for (const rule of ruleMap.values()) {
  const char = rule.pair[0];
  charMap[char] = charMap[char] || 0;
  charMap[char] += rule.count;
}

// Account for last char in template
charMap[template[template.length - 1]]++;

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
