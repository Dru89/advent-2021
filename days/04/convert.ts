import { Board } from "./board";

interface Scanned {
  values: number[];
  boards: Board[];
}

export function convert(text: string): Scanned {
  const lines = text.trim().split("\n");
  const values = lines[0].split(",").map((val) => parseInt(val));
  const boards: Board[] = [];
  let currentBoard: number[][] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.length !== 0) {
      currentBoard.push(
        line
          .trim()
          .split(/\s+/)
          .map((val) => parseInt(val))
      );
    }
    if (line.length === 0 || i === lines.length - 1) {
      if (currentBoard.length !== 0) {
        boards.push(new Board(currentBoard));
        currentBoard = [];
      }
    }
  }

  return { values, boards };
}
