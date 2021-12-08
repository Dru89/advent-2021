import { difference, intersect, union, of, equal, includes } from "./sets";

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

function assertSize(
  set: Set<unknown>,
  size: number,
  message: string,
  allowZero = true
) {
  const setSize = set.size;
  if (setSize === size) return;
  if (setSize === 0 && allowZero) return;
  console.log(message, "Should have size", size, set);
  throw new Error(message);
}

const solve = (row: string[]): Array<Set<string>> => {
  const one = intersect(...row.filter((light) => light.length === 2));
  const four = intersect(...row.filter((light) => light.length === 4));
  const seven = intersect(...row.filter((light) => light.length === 3));
  const eight = intersect(...row.filter((light) => light.length === 7));

  assertSize(one, 2, "Invalid options for '1' light.", false);
  assertSize(four, 4, "Invalid options for '4' light.", false);
  assertSize(seven, 3, "Invalid options for '7' light.", false);
  assertSize(eight, 7, "Invalid options for '8' light.", false);

  const solved = [one, four, seven, eight];
  const sets = row.map((light) => of(light));
  let unsolved = sets.filter(
    (set) => !solved.some((solve) => equal(solve, set))
  );

  // Since we've removed 8s, a 9 is anything that contains both a 4 and a 7.
  const nineFinder = union(four, seven);
  const nines = unsolved.filter((set) => includes(set, nineFinder));
  const nine = intersect(...nines);
  assertSize(nine, 6, "Invalid options for '9' light.");
  unsolved = unsolved.filter((set) => !equal(set, nine));

  // If you subtract 7 from 8, only 6 can fit.
  const six = intersect(
    ...unsolved.filter((set) => includes(set, difference(eight, seven)))
  );
  assertSize(six, 6, "Invalid options for '6' light.");
  unsolved = unsolved.filter((set) => !equal(set, six));

  // Which means 4 minus 1 can only be 5.
  const five = intersect(
    ...unsolved.filter((set) => includes(set, difference(four, one)))
  );
  assertSize(five, 5, "Invalid options for '5' light.");
  unsolved = unsolved.filter((set) => !equal(set, five));

  // 8 - 4 + 1 = 0
  const zeroFinder = union(difference(eight, four), one);
  const zero = intersect(
    ...unsolved.filter((set) => includes(set, zeroFinder))
  );
  assertSize(zero, 6, "Invalid options for '0' light.");
  unsolved = unsolved.filter((set) => !equal(set, zero));

  // so now 8 - 4 = 2
  const twoFinder = difference(eight, four);
  const two = intersect(...unsolved.filter((set) => includes(set, twoFinder)));
  assertSize(two, 5, "Invalid options for '2' light.");
  unsolved = unsolved.filter((set) => !equal(set, two));

  // and so the only number left is three.
  const three = intersect(...unsolved);
  assertSize(three, 5, "Invalid options for '3' light.");

  return [zero, one, two, three, four, five, six, seven, eight, nine];
};

export default solve;
