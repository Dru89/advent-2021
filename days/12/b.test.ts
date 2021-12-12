import process from "./b";

const input1 = `
start-A
start-b
A-c
A-b
b-d
A-end
b-end
`;

const input2 = `
dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
`;

const input3 = `
fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW
`;

describe("day 12", () => {
  describe("part one", () => {
    it("matches the first example", () => {
      expect(process(input1)).toBe(36);
    });
    it("matches the second example", () => {
      expect(process(input2)).toBe(103);
    });
    it("matches the third example", () => {
      expect(process(input3)).toBe(3509);
    });
  });
});
