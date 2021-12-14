import process from "./a";

const input = `
NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
`;

describe("day 14", () => {
  describe("part one", () => {
    it("matches the example", () => {
      expect(process(input)).toBe(1588);
    });
  });
});
