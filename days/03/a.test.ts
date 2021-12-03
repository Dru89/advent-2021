import process from "./a";

const input = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`;

describe("day three", () => {
  describe("part one", () => {
    it("matches the example", () => {
      expect(process(input)).toBe(198);
    });
  });
});
