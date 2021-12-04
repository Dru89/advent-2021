import { convert } from "./convert";

export default function process(text: string) {
  const { boards, values } = convert(text);

  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    for (let j = 0; j < boards.length; j++) {
      const board = boards[j];
      const result = board.mark(value);
      if (result != null) return result;
    }
  }
}
