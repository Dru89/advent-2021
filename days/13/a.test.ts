import process from "./a";

const input = `
6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
`;

describe("day 13", () => {
  describe("part one", () => {
    it("matches the example", () => {
      expect(process(input)).toBe(17);
    });
  });
});
