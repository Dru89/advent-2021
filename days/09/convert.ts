export default function convert(text: string): number[][] {
  return text
    .trim()
    .split("\n")
    .map((row) => [...row].map((val) => parseInt(val)));
}
