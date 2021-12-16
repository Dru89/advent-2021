const packetTypes = [
  "sum",
  "product",
  "minimum",
  "maximum",
  "literal",
  "greaterThan",
  "lesserThan",
  "equalTo",
] as const;

export type TokenType = typeof packetTypes[number];
export type LengthType = "length" | "subpackets";

export type LiteralToken = {
  type: "literal";
  value: number;
  version: number;
};
export type OperatorToken = {
  type: Exclude<TokenType, "literal">;
  tokens: Token[];
  version: number;
};
export type Token = LiteralToken | OperatorToken;

function readNextTokenSet(input: Buffer, startIndex: number): [Token, number] {
  let bufferIndex = startIndex;

  const readBin = (length: number): string => {
    const result = input.toString("utf8", bufferIndex, bufferIndex + length);
    bufferIndex += length;
    return result;
  };

  const readInt = (length: number): number => parseInt(readBin(length), 2);
  const readVersion = (): number => readInt(3);
  const readType = (): TokenType => packetTypes[readInt(3)];
  const readLengthType = (): LengthType =>
    readInt(1) === 0 ? "length" : "subpackets";
  const readLength = (type: LengthType): number =>
    readInt(type === "length" ? 15 : 11);

  const readLiteral = (): [boolean, string] => [readBin(1) === "0", readBin(4)];

  const version = readVersion();
  const type = readType();

  if (type === "literal") {
    let bin: string[] = [];
    while (true) {
      const [isLast, nibble] = readLiteral();
      bin.push(nibble);
      if (isLast) break;
    }
    const value = parseInt(bin.join(""), 2);
    return [{ type: "literal", version, value }, bufferIndex];
  } else {
    const lengthType = readLengthType();
    const length = readLength(lengthType);
    const tokens: Token[] = [];
    if (lengthType === "subpackets") {
      for (let x = 0; x < length; x++) {
        const [subtoken, index] = readNextTokenSet(input, bufferIndex);
        tokens.push(subtoken);
        bufferIndex = index;
      }
    } else {
      const subBuffer = Buffer.from(readBin(length), "utf8");
      let subI = 0;
      while (subBuffer.length - subI > 6) {
        const [subtoken, newIndex] = readNextTokenSet(subBuffer, subI);
        subI = newIndex;
        tokens.push(subtoken);
      }
    }
    return [{ type, tokens, version }, bufferIndex];
  }
}

export default function readTokens(buffer: Buffer) {
  const [tokens] = readNextTokenSet(buffer, 0);
  return tokens;
}
