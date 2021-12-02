import fs from 'fs';
import path from 'path';

export function parseInput() {
  return fs
    .readFileSync(`${path.dirname(process.argv[1])}/input`, 'utf-8')
    .split('\n');
}
