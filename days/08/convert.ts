export default function convert(text: string): Array<[string[], string[]]> {
  return text
    .trim()
    .split("\n")
    .map((line) => {
      const piped = line.split("|");
      if (piped.length !== 2) throw new Error(`Invalid line: ${line}`);
      const [patterns, output] = piped;

      return [patterns.trim().split(" "), output.trim().split(" ")];
    });
}
