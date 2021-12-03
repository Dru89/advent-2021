import process from "./b";

const input = `
199
200
208
210
200
207
240
269
260
263
`;

describe("day one", () => {
  describe("part two", () => {
    it("matches the example", () => {
      expect(process(input)).toBe(5);
    });
  });
});
