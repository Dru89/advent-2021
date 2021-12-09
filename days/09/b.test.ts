import process from "./b";

const input = `
2199943210
3987894921
9856789892
8767896789
9899965678
`;

describe("day nine", () => {
  describe("part two", () => {
    it("matches the example", () => {
      expect(process(input)).toBe(1134);
    });
  });
});
