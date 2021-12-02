import process from "./b";

const input = `
forward 5
down 5
forward 8
up 3
down 8
forward 2
`;

describe("day two", () => {
  describe("part two", () => {
    it("matches the example", () => {
      expect(process(input)).toBe(900);
    });
  });
});
