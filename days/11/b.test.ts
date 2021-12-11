import process from "./b";

const input = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`;

describe("day 11", () => {
  describe("part two", () => {
    it("matches the example", () => {
      expect(process(input)).toBe(195);
    });
  });
});
