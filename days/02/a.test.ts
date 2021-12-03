import process from "./a";

const input = `
forward 5
down 5
forward 8
up 3
down 8
forward 2
`;

describe("day two", () => {
  describe("part one", () => {
    it("matches the example", () => {
      expect(process(input)).toBe(150);
    });
  });
});
