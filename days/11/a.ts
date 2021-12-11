import convert from "./convert";

type Point = [number, number];
export default function process(text: string) {
  const octopuses = convert(text);

  const surrounding = ([x, y]: Point): Point[] => {
    const mx = octopuses.length - 1;
    const my = octopuses[x].length - 1;

    const xs: number[] = [x];
    if (x > 0) xs.push(x - 1);
    if (x < mx) xs.push(x + 1);

    const ys: number[] = [y];
    if (y > 0) ys.push(y - 1);
    if (y < my) ys.push(y + 1);

    const points: Point[] = [];
    xs.forEach((x0) => {
      ys.forEach((y0) => {
        if (x0 !== x || y0 !== y) {
          points.push([x0, y0]);
        }
      });
    });
    return points;
  };

  const bump = ([i, j]: Point) => ++octopuses[i][j];
  const get = ([i, j]: Point) => octopuses[i][j];

  const increment = (): Point[] => {
    const flashing: Point[] = [];
    for (let i = 0; i < octopuses.length; i++) {
      for (let j = 0; j < octopuses.length; j++) {
        if (bump([i, j]) > 9) {
          flashing.push([i, j]);
        }
      }
    }
    return flashing;
  };

  const flash = (points: Point[]): Point[] => {
    const queue = [...points];
    const k = ([x, y]: Point) => `${x},${y}`;
    const v = (k: string): Point =>
      k.split(",").map((x) => parseInt(x)) as Point;
    const set = new Set<string>();
    while (queue.length !== 0) {
      const point = queue.shift()!;
      if (set.has(k(point))) continue;
      surrounding(point).forEach((p) => {
        if (bump(p) > 9) queue.push(p);
      });
      set.add(k(point));
    }

    const flashed: Point[] = [];
    set.forEach((k) => flashed.push(v(k)));
    return flashed;
  };

  const reset = (points: Point[]) => {
    points.forEach(([x, y]) => {
      octopuses[x][y] = 0;
    });
    return points.length;
  };

  let total = 0;
  for (let i = 0; i < 100; i++) {
    total += reset(flash(increment()));
  }
  return total;
}
