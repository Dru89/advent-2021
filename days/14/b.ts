import { convert } from "./convert";
import { CountMap } from "./count-map";

function createMapFromString(input: string): CountMap<string> {
  const map = new CountMap<string>();
  map.increment(input[0]);
  for (let i = 1; i < input.length; i++) {
    map.increment(input[i]);
    map.increment(`${input[i - 1]}${input[i]}`);
  }
  return map;
}

function createMapFromMap(
  input: Map<string, number>,
  rules: Map<string, string>
) {
  const map = new CountMap<string>();
  input.forEach((count, key) => {
    if (key.length === 1) {
      map.increment(key, count);
      return;
    }

    const newLetter = rules.get(key);
    const [first, last] = key;
    if (newLetter) {
      map.increment(`${first}${newLetter}`, count);
      map.increment(`${newLetter}${last}`, count);
      map.increment(newLetter, count);
    } else {
      map.increment(key, count);
    }
  });
  return map;
}

function createMapFromMapNTimes(
  input: Map<string, number>,
  rules: Map<string, string>,
  times: number
) {
  let map = input;
  for (let i = 0; i < times; i++) {
    map = createMapFromMap(map, rules);
  }
  return map;
}

export default function process(text: string) {
  const { template, rules } = convert(text);
  const map = createMapFromMapNTimes(createMapFromString(template), rules, 40);

  let min: number | undefined;
  let max: number | undefined;
  map.forEach((count, key) => {
    if (key.length !== 1) return;
    if (min == null || count < min) min = count;
    if (max == null || count > max) max = count;
  });
  if (max == null || min == null) {
    throw new Error("No values found for max or min.");
  }
  return max - min;
}
