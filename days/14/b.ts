import { convert, cycle } from "./convert";

export default function process(text: string) {
  const { list, rules } = convert(text);
  cycle(list, rules, 40);

  const map = new Map<string, number>();
  list.forEach((letter) => {
    map.set(letter, (map.get(letter) ?? 0) + 1);
  });

  let min: number | undefined;
  let max: number | undefined;
  map.forEach((count, letter) => {
    if (min == null || count < min) min = count;
    if (max == null || count > max) max = count;
  });
  if (max == null || min == null) {
    throw new Error("No values found for max or min.");
  }
  return max - min;
}
