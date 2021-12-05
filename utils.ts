import fs from 'fs';
import path from 'path';

export function parseInput() {
  return fs
    .readFileSync(`${path.dirname(process.argv[1])}/input`, 'utf-8')
    .trim()
    .split('\n');
}

type Row<T> = Map<number, T>;
type GridData<T> = Map<number, Row<T>>;

export class Grid<T extends string | number> {
  private data: GridData<T> = new Map();

  minX = 0;

  maxX = 0;

  minY = 0;

  maxY = 0;

  set(x: number, y: number, value: T) {
    let row = this.data.get(x);
    if (!row) {
      row = new Map<number, T>();
      this.data.set(x, row);
    }
    row.set(y, value);

    if (x > this.maxX) {
      this.maxX = x; }
    if (x < this.minX) {
      this.minX = x;
    }
    if (y > this.maxY) {
      this.maxY = y;
    }
    if (y < this.minY) {
      this.minY = y;
    }
  }

  get(x: number, y: number) {
    return this.data.get(x)?.get(y);
  }

  *[Symbol.iterator]() {
    for (let y = this.minY; y <= this.maxY; y++) {
      for (let x = this.minX; x <= this.maxX; x++) {
        yield this.get(x, y);
      }
    }
  }

  print() {
    for (let y = this.minY; y <= this.maxY; y++) {
      for (let x = this.minX; x <= this.maxX; x++) {
        process.stdout.write(this.get(x, y)?.toString() || '.');
      }
      process.stdout.write('\n');
    }
  }
}
