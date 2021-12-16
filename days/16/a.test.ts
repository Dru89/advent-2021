import process from "./a";

describe("day 15", () => {
  describe("part one", () => {
    it("matches the example", () => {
      expect(process("8A004A801A8002F478")).toBe(16);
      expect(process("620080001611562C8802118E34")).toBe(12);
      expect(process("C0015000016115A2E0802F182340")).toBe(23);
      expect(process("A0016C880162017C3686B18A3D4780")).toBe(31);
    });
  });
});
