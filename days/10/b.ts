import { Close, createStack, MismatchError, Open, openToClose } from "./braces";

const closeScore: Record<Close, number> = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

function calculate(stack: Open[]): number {
  return stack.reduceRight(
    (memo, open) => memo * 5 + closeScore[openToClose[open]],
    0
  );
}

export default function process(text: string) {
  const lines = text.trim().split("\n");
  const scores: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    try {
      scores.push(calculate(createStack(lines[i])));
    } catch (e) {
      if (!(e instanceof MismatchError)) {
        throw e;
      }
    }
  }
  scores.sort((a, b) => a - b);
  return scores[Math.floor(scores.length / 2)];
}
