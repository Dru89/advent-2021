export type Point = [number, number];
export type Axis = "x" | "y";
export type Fold = { axis: Axis; pivot: number };

export interface Instructions {
  paper: Paper;
  folds: Fold[];
}

const pointR = /^(\d+),(\d+)$/;
const foldR = /^fold along ([xy])=(\d+)$/;

export function convert(text: string): Instructions {
  const points: Point[] = [];
  const folds: Fold[] = [];

  text
    .trim()
    .split("\n")
    .forEach((line) => {
      if (!line.trim()) return;

      const pointX = pointR.exec(line);
      const foldX = foldR.exec(line);

      if (pointX) {
        points.push([parseInt(pointX[1]), parseInt(pointX[2])]);
      } else if (foldX) {
        folds.push({ axis: foldX[1] as Axis, pivot: parseInt(foldX[2]) });
      } else {
        throw new Error(`Could not parse line: ${line}`);
      }
    });

  return { paper: new Paper(points), folds };
}

// ...|...x
// pivot = 3
// value = 7

function translate(
  value: number,
  pivot: number,
  shift: number,
  should: boolean
) {
  if (!should) return value;
  if (value < pivot) return shift + value;
  return shift + 2 * pivot - value;
}

const get = ([x, y]: Point, axis: Axis) => (axis === "x" ? x : y);

class Paper {
  public readonly maxX: number;
  public readonly maxY: number;

  constructor(public readonly points: Point[]) {
    this.maxX = Math.max(...points.map(([x]) => x));
    this.maxY = Math.max(...points.map(([, y]) => y));
  }

  fold({ axis, pivot }: Fold): Paper {
    const newPoints: Point[] = [];
    const seen = new Set<string>();
    const k = ([x, y]: Point) => `${x},${y}`;

    const max = axis === "x" ? this.maxX : this.maxY;
    const shift = Math.max(0, max - 2 * pivot);

    this.points.forEach(([x, y]) => {
      if (get([x, y], axis) === pivot) {
        throw new Error(`Point ${x},${y} exists on fold: ${axis}=${pivot}.`);
      }

      const newPoint: Point = [
        translate(x, pivot, shift, axis === "x"),
        translate(y, pivot, shift, axis === "y"),
      ];

      if (!seen.has(k(newPoint))) {
        newPoints.push(newPoint);
        seen.add(k(newPoint));
      }
    });

    return new Paper(newPoints);
  }
}

export function plot(paper: Paper): string {
  const graph: string[][] = new Array(paper.maxY + 1);
  for (let i = 0; i <= paper.maxY; i++) {
    graph[i] = new Array(paper.maxX + 1).fill(".");
  }

  paper.points.forEach(([x, y]) => (graph[y][x] = "#"));
  return graph.map((row) => row.join("")).join("\n");
}
