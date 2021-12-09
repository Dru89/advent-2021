import convert from "./convert";

function isNumber(x: unknown): x is number {
  return typeof x === "number";
}

export default function process(text: string): number {
  const field = convert(text);

  const get = (i: number, j: number): number | undefined => {
    if (i < 0 || i >= field.length) return undefined;
    if (j < 0 || j >= field[i].length) return undefined;
    return field[i][j];
  };

  const adjacents = (i: number, j: number): number[] => {
    return [get(i - 1, j), get(i + 1, j), get(i, j - 1), get(i, j + 1)].filter(
      isNumber
    );
  };

  const isLowPoint = (i: number, j: number): boolean => {
    const value = field[i][j];
    return value < Math.min(...adjacents(i, j));
  };

  const getBasinSize = (i: number, j: number): number => {
    const queue: [number, number][] = [[i, j]];
    const set = new Set<string>();

    const shouldAdd = (i: number, j: number): boolean => {
      if (set.has(`${i},${j}`)) return false;
      const val = get(i, j);
      return val != null && val !== 9;
    };

    while (queue.length !== 0) {
      const [x, y] = queue.pop()!;
      set.add(`${x},${y}`);
      if (shouldAdd(x - 1, y)) queue.push([x - 1, y]);
      if (shouldAdd(x + 1, y)) queue.push([x + 1, y]);
      if (shouldAdd(x, y - 1)) queue.push([x, y - 1]);
      if (shouldAdd(x, y + 1)) queue.push([x, y + 1]);
    }
    return set.size;
  };

  let basins: number[] = [];
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (isLowPoint(i, j)) {
        basins.push(getBasinSize(i, j));
      }
    }
  }

  return basins
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((product, val) => product * val, 1);
}
