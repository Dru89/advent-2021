import read, { Token, TokenType } from "./parser";

const hexToBin = {
  "0": "0000",
  "1": "0001",
  "2": "0010",
  "3": "0011",
  "4": "0100",
  "5": "0101",
  "6": "0110",
  "7": "0111",
  "8": "1000",
  "9": "1001",
  A: "1010",
  B: "1011",
  C: "1100",
  D: "1101",
  E: "1110",
  F: "1111",
} as const;

function isHex(s: unknown): s is keyof typeof hexToBin {
  if (typeof s !== "string") return false;
  return hexToBin[s as keyof typeof hexToBin] != null;
}

function toBinary(hexString: string): string {
  const hex = [...hexString.trim().toUpperCase()];
  const filtered = hex.filter(isHex);
  if (hex.length !== filtered.length) {
    throw new Error(`Invalid hex string: ${hexString}`);
  }
  return filtered.map((h) => hexToBin[h]).join("");
}

export default function convert(hexString: string): Token {
  const binary = toBinary(hexString);
  const buffer = Buffer.from(binary, "utf8");
  return read(buffer);
}

export function sumVersion(tokens: Token[]): number {
  return tokens
    .map(
      (token) =>
        token.version +
        (token.type === "literal" ? 0 : sumVersion(token.tokens))
    )
    .reduce((memo, val) => memo + val, 0);
}

const cmp: Record<TokenType, (args: number[]) => number> = {
  equalTo: ([a, b]) => (a === b ? 1 : 0),
  lesserThan: ([a, b]) => (a < b ? 1 : 0),
  greaterThan: ([a, b]) => (a > b ? 1 : 0),
  literal: () => 0,
  maximum: (nums) => Math.max(...nums),
  minimum: (nums) => Math.min(...nums),
  product: (nums) => nums.reduce((prod, val) => prod * val, 1),
  sum: (nums) => nums.reduce((s, v) => s + v, 0),
} as const;

export function getValue(token: Token): number {
  const assertTwo = (token: Token) => {
    if (token.type === "literal") {
      console.log("Invalid token:", JSON.stringify(token));
      throw new Error("Don't call assertTwo with literals.");
    }
    if (token.tokens.length !== 2) {
      console.log("Invalid token:", JSON.stringify(token));
      throw new Error(
        `Expected ${token.type} to only have two arguments. Found ${token.tokens.length}.`
      );
    }
  };

  if (token.type === "literal") {
    return token.value;
  }

  if (
    token.type === "greaterThan" ||
    token.type === "lesserThan" ||
    token.type === "equalTo"
  ) {
    assertTwo(token);
  }

  return cmp[token.type](token.tokens.map((t) => getValue(t)));
}
