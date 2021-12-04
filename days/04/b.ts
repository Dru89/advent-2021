import { convert } from "./convert";

function partition<T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => boolean
): [T[], T[]] {
  const yes: T[] = [];
  const no: T[] = [];
  array.forEach((value, index, arr) => {
    const which = predicate(value, index, arr) ? yes : no;
    which.push(value);
  });
  return [yes, no];
}

export default function process(text: string) {
  let { boards, values } = convert(text);

  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    const [yes, no] = partition(boards, (board) => board.mark(value) != null);
    if (no.length === 0) {
      return yes[yes.length - 1].score(value);
    }
    boards = no;
  }
}
