import process from "./a";

const input = `
2199943210
3987894921
9856789892
8767896789
9899965678
`;

describe("day nine", () => {
  describe("part one", () => {
    it("matches the example", () => {
      expect(process(input)).toBe(15);
    });
  });
});
