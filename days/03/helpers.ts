export function convert(text: string): string[] {
  return text.trim().split("\n").filter(Boolean);
}

export function ones(lines: string[]): number[] {
  const ones = new Array<number>(lines[0].length).fill(0);
  lines.forEach((line) => {
    for (let i = 0; i < line.length; i++) {
      if (line[i] === "1") {
        ones[i]++;
      }
    }
  });
  return ones;
}
