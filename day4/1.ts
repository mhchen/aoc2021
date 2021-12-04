import { parseInput } from '../utils';

const lines = parseInput();

const allBoardLines = lines.slice(2);

interface Coordinates {
  x: number;
  y: number;
}

class Board {
  private marked: boolean[][] = [];

  private grid: number[][];

  private maxX: number;

  private maxY: number;

  private numberMap = new Map<number, Coordinates>();

  constructor(grid: number[][]) {
    this.grid = grid;
    this.maxY = grid.length;
    this.maxX = grid[0].length;

    for (let x = 0; x < this.maxX; x++) {
      for (let y = 0; y < this.maxY; y++) {
        this.numberMap.set(grid[x][y], {
          x,
          y,
        });
      }
    }
  }

  hasWon(): boolean {
    for (let x = 0; x < this.maxX; x++) {
      let allMarked = true;
      for (let y = 0; y < this.maxY; y++) {
        if (!this.marked[x]?.[y]) {
          allMarked = false;
          break;
        }
      }
      if (allMarked) {
        return true;
      }
    }
    for (let y = 0; y < this.maxY; y++) {
      let allMarked = true;
      for (let x = 0; x < this.maxX; x++) {
        if (!this.marked[x]?.[y]) {
          allMarked = false;
          break;
        }
      }
      if (allMarked) {
        return true;
      }
    }
    return false;
  }

  mark(targetNumber: number): void {
    const coordinates = this.numberMap.get(targetNumber);
    if (!coordinates) {
      return;
    }

    const { x, y } = coordinates;
    this.marked[x] = this.marked[x] || [];
    this.marked[x][y] = true;
  }

  tallyUnmarkedNumbers(): number {
    let total = 0;
    for (let x = 0; x < this.maxX; x++) {
      for (let y = 0; y < this.maxY; y++) {
        if (!this.marked[x]?.[y]) {
          total += this.grid[x][y];
        }
      }
    }
    return total;
  }
}

const boards: Board[] = [];

while (allBoardLines.length) {
  const boardLines: string[] = [];
  while (allBoardLines[0]?.length) {
    boardLines.push(allBoardLines.shift() as string);
  }
  const grid = boardLines.map((line) => line.trim().split(/\s+/).map(Number));
  boards.push(new Board(grid));

  allBoardLines.shift();
}

interface PlayResult {
  board: Board;
  winningNumber: number;
}

function play() {
  for (const drawnNumber of lines[0].split(',').map(Number)) {
    for (const board of boards) {
      board.mark(drawnNumber);
      if (board.hasWon()) {
        return {
          board,
          winningNumber: drawnNumber,
        };
      }
    }
  }
}

const { board, winningNumber } = play() as PlayResult;

console.log(board.tallyUnmarkedNumbers() * winningNumber);
