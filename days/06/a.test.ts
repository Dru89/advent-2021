import process from "./a";

const input = `3,4,3,1,2`;

describe("day six", () => {
  describe("part one", () => {
    it("matches the example", () => {
      expect(process(input)).toBe(5934);
    });
  });
});
