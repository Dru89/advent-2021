import { convert, multiply, walk } from "./convert";

export default function process(text: string): number {
  const field = multiply(convert(text), 5);
  const result = walk(field);

  if (result == null) throw new Error("Incorrectly walked field.");
  return result.reduce((sum, [x, y]) => sum + field[x][y], 0) - field[0][0];
}
