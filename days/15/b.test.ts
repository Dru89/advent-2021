import process from "./b";

const input = `
1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581
`;

describe("day 15", () => {
  describe("part two", () => {
    it("matches the example", () => {
      expect(process(input)).toBe(315);
    });
  });
});
