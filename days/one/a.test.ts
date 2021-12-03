import process from "./a.mjs";

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
  describe("part one", () => {
    it("matches the example", () => {
      expect(process(input)).toBe(7);
    });
  });
});
