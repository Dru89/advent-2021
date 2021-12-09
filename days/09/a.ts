import convert from "./convert";

export default function process(text: string): number {
  const field = convert(text);

  const adjacents = (i: number, j: number): number[] => {
    const values: number[] = [];
    if (i > 0) values.push(field[i - 1][j]);
    if (i < field.length - 1) values.push(field[i + 1][j]);
    if (j > 0) values.push(field[i][j - 1]);
    if (j < field[i].length - 1) values.push(field[i][j + 1]);

    return values;
  };

  const isLowPoint = (i: number, j: number): boolean => {
    const value = field[i][j];
    return value < Math.min(...adjacents(i, j));
  };

  let sum = 0;
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (isLowPoint(i, j)) sum += field[i][j] + 1;
    }
  }
  return sum;
}
