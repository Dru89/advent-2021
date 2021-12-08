import { MapList } from "./maplist";
import { difference, intersect, union } from "./sets";

//   0:      1:      2:      3:      4:
//  aaaa    ....    aaaa    aaaa    ....
// b    c  .    c  .    c  .    c  b    c
// b    c  .    c  .    c  .    c  b    c
//  ....    ....    dddd    dddd    dddd
// e    f  .    f  e    .  .    f  .    f
// e    f  .    f  e    .  .    f  .    f
//  gggg    ....    gggg    gggg    ....

//   5:      6:      7:      8:      9:
//  aaaa    aaaa    aaaa    aaaa    aaaa
// b    .  b    .  .    c  b    c  b    c
// b    .  b    .  .    c  b    c  b    c
//  dddd    dddd    ....    dddd    dddd
// .    f  e    f  .    f  e    f  .    f
// .    f  e    f  .    f  e    f  .    f
//  gggg    gggg    ....    gggg    gggg

// 1, 2, 7, and 8 have a unique number of digits.
// 0, 6, and 9 have six digits.
// 2, 3, and 5 have five digits.
// prettier-ignore
const segments = [
  new Set('abcefg'),  // 0 [6]
  new Set('cf'),      // 1 [2]*
  new Set('acdeg'),   // 2 [5]
  new Set('acdfg'),   // 3 [5]
  new Set('bcdf'),    // 4 [4]*
  new Set('abdfg'),   // 5 [5]
  new Set('abdefg'),  // 6 [6]
  new Set('acf'),     // 7 [3]*
  new Set('abcdefg'), // 8 [7]*
  new Set('abcdfg'),  // 9 [6]
] as Array<Set<Position>>;

const segmentsBySize = segments.reduce(
  (map, val) => map.add(val.size, val),
  new MapList<number, Set<Position>>()
);

const positions = ["a", "b", "c", "d", "e", "f", "g"] as const;
type Position = typeof positions[number];

// LOGIC
// for each light in row
//   segments = sizedSegments[light.length]
//   for each char in light
//     if solved.has(key) continue
//     possible[char] = intersect(possible[char], union(...segments))
//
//     while [key, value] = canSolveAny(possible)
//       solved.set(key, value)
//       for possibleValues in possibilities.values()
//         possibleValues.delete(value)

const solve = (row: string[]): Map<Position, Position> => {
  const possible = new Map<Position, Set<Position>>();
  const solvedByKey = new Map<Position, Position>();
  const solvedValues = new Set<Position>();

  const canSolveAny = (): [Position, Position] | undefined => {
    for (let [key, value] of possible) {
      if (value.size === 0) {
        throw new Error(`${key} impossibly has 0 options`);
      }
      if (value.size === 1) {
        return [key, [...value][0]];
      }
    }
  };

  row.forEach((item) => {
    const segments = segmentsBySize.get(item.length);
    if (!segments) {
      throw new Error(`No light matches ${item} with length ${item.length}`);
    }

    const allLetters = difference(union(...segments), solvedValues);
    const chars = [...item] as Position[];
    chars.forEach((char) => {
      if (solvedByKey.has(char)) return;
      const p = possible.get(char);
      if (p == null) {
        possible.set(char, allLetters);
      } else {
        console.log(
          "got a repeat",
          char,
          chars.join(""),
          p,
          allLetters,
          intersect(p, allLetters)
        );
        possible.set(char, intersect(p, allLetters));
      }

      // console.log("narrowed", char, "to", possible.get(char));

      let solved: [Position, Position] | undefined;
      while ((solved = canSolveAny())) {
        const [key, value] = solved;
        console.log("solved", key, "=", value);
        solvedByKey.set(key, value);
        solvedValues.add(value);
        possible.delete(key);
        for (let pValue of possible.values()) {
          pValue.delete(value);
        }
      }
    });
  });

  const all = new Set(row.join(""));
  console.log(solvedByKey, possible);
  all.forEach((key) => {
    const possibilities = possible.get(key as Position);
    const solution = solvedByKey.get(key as Position);
    if (!solution) {
      console.log(key, "has possibilities", possibilities);
      throw new Error(`Could not find solution for ${key}`);
    }
  });

  return solvedByKey;
};

export default solve;
