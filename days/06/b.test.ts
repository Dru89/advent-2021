import process from "./b";

const input = `3,4,3,1,2`;

describe("day six", () => {
  describe("part two", () => {
    it("matches the example", () => {
      expect(process(input)).toBe(26984457539);
    });
  });
});
