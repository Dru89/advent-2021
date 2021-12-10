import { Close, createStack, MismatchError } from "./braces";

const closeScore: Record<Close, number> = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

export default function process(text: string) {
  const lines = text.trim().split("\n");
  let score = 0;
  for (let i = 0; i < lines.length; i++) {
    try {
      createStack(lines[i]);
    } catch (e) {
      if (e instanceof MismatchError) {
        score += closeScore[e.char];
      } else {
        throw e;
      }
    }
  }
  return score;
}
