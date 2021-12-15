export function convert(text: string): number[][] {
  return text
    .trim()
    .split("\n")
    .map((line) => [...line].map((num) => parseInt(num)));
}

// 1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20
// 1  2  3  4  5  6  7  8  9  1  2  3  4  5  6  7  8  9  1  2

const calc = (a: number, b: number): number => {
  if (a + b <= 9) return a + b;
  return calc(a, b - 9);
};

export function multiply(field: number[][], times = 5) {
  const multiplied = new Array(field.length * times);
  for (let i = 0; i < field.length * times; i++) {
    const i0 = i % field.length;
    const ix = Math.floor(i / field.length);
    multiplied[i] = new Array(field[i0].length * times);
    for (let j = 0; j < field[i0].length * times; j++) {
      const j0 = j % field[i0].length;
      const jx = Math.floor(j / field[i0].length);
      multiplied[i][j] = calc(field[i0][j0], ix + jx);
    }
  }
  return multiplied;
}

type Point = [number, number];
const k = ([x, y]: Point) => `${x},${y}`;
const v = (xy: string): [number, number] =>
  xy.split(",").map((v) => parseInt(v)) as [number, number];

function reconstruct(cameFrom: Map<string, string>, point: Point) {
  const path = [point];
  let current = point;
  while (cameFrom.has(k(current))) {
    current = v(cameFrom.get(k(current))!);
    path.unshift(current);
  }
  return path;
}

export function walk(
  field: number[][],
  start: Point = [0, 0],
  goal: Point = [field.length - 1, field[0].length - 1]
) {
  const adjacent = ([x, y]: Point): Point[] => {
    const points: Point[] = [];
    if (x > 0) points.push([x - 1, y]);
    if (y > 0) points.push([x, y - 1]);
    if (x < field.length - 1) points.push([x + 1, y]);
    if (y < field[x].length - 1) points.push([x, y + 1]);
    return points;
  };

  const openList = [start];
  const openSet = new Set<string>([k(start)]);
  const cameFrom = new Map<string, string>();

  const scores = new Map<string, number>();
  scores.set(k(start), 0);

  const score = (p: Point) => scores.get(k(p)) ?? Number.POSITIVE_INFINITY;
  const get = ([x, y]: Point) => field[x][y];

  while (openList.length !== 0) {
    // TODO: Find a better point with pQueue?
    const point = openList.shift()!;
    openSet.delete(k(point));
    if (k(point) === k(goal)) return reconstruct(cameFrom, point);

    adjacent(point).forEach((adj) => {
      const tg = score(point) + get(adj);
      if (tg < score(adj)) {
        cameFrom.set(k(adj), k(point));
        scores.set(k(adj), tg);
        if (!openSet.has(k(adj))) {
          openSet.add(k(adj));
          openList.push(adj);
        }
      }
    });
  }
}
