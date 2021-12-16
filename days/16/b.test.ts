import process from "./b";

describe("day 15", () => {
  describe("part one", () => {
    it("matches the example", () => {
      expect(process("C200B40A82")).toBe(3);
      expect(process("04005AC33890")).toBe(54);
      expect(process("880086C3E88112")).toBe(7);
      expect(process("CE00C43D881120")).toBe(9);
      expect(process("D8005AC2A8F0")).toBe(1);
      expect(process("F600BC2D8F")).toBe(0);
      expect(process("9C005AC2F8F0")).toBe(0);
      expect(process("9C0141080250320F1802104A08")).toBe(1);
    });
  });
});
