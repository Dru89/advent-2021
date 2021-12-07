import process from "./b";

const input = `16,1,2,0,4,2,7,1,2,14`;

describe("day seven", () => {
  describe("part two", () => {
    it("matches the example", () => {
      expect(process(input)).toBe(168);
    });
  });
});
