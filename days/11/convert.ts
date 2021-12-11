export default function convert(text: string): number[][] {
  return text
    .trim()
    .split("\n")
    .map((line) => [...line].map((v) => parseInt(v)));
}
