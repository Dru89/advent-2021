import { isNumber } from "../../utils";

export const directions = ["forward", "down", "up"] as const;
export type Direction = typeof directions[number];

export interface Command {
  direction: Direction;
  amount: number;
}

function isCommand(x: unknown): x is Command {
  if (x == null || typeof x !== "object") return false;
  const c = x as Command;
  return directions.includes(c.direction) && typeof c.amount === "number";
}

function isDirection(x: unknown): x is Direction {
  return directions.includes(x as Direction);
}

function notEmpty<T>(value: T | null | undefined): value is T {
  return value != null;
}

export default function convert(text: string): Command[] {
  return text
    .split("\n")
    .map((x) => {
      const res = x.split(" ");
      if (res.length !== 2) return null;

      const [direction, amount] = res;
      if (!isDirection(direction)) return null;
      if (!isNumber(amount)) return null;

      return { direction, amount: parseFloat(amount) };
    })
    .filter(notEmpty);
}
