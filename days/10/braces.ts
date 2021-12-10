export const open = ["(", "[", "{", "<"] as const;
export const close = [")", "]", "}", ">"] as const;
export type Open = typeof open[number];
export type Close = typeof close[number];

export const closeToOpen: Record<Close, Open> = {
  ">": "<",
  "}": "{",
  ")": "(",
  "]": "[",
};

export const openToClose: Record<Open, Close> = {
  "<": ">",
  "{": "}",
  "(": ")",
  "[": "]",
};

export function isOpen(x: unknown): x is Open {
  return typeof x === "string" && x.length === 1 && open.includes(x as Open);
}

export function isClose(x: unknown): x is Close {
  return typeof x === "string" && x.length === 1 && close.includes(x as Close);
}

export class MismatchError extends Error {
  constructor(
    public readonly char: Close,
    public readonly expected: Close | undefined
  ) {
    super(`Mismatched brace. Found ${char}, expected ${expected}.`);
  }
}

export function createStack(line: string): Open[] {
  const stack: Open[] = [];
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (isOpen(char)) {
      stack.push(char);
    } else if (isClose(char)) {
      const open = stack.pop();
      if (open !== closeToOpen[char]) {
        throw new MismatchError(char, open ? openToClose[open] : undefined);
      }
    } else {
      throw new Error(`Unexpected char: ${char}`);
    }
  }
  return stack;
}
