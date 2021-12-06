export default function convert(text: string): number[] {
  return text
    .trim()
    .split(",")
    .map((val) => parseInt(val));
}
