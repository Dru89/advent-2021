import convert from "./convert";

export default function process(text: string): number {
  const lines = convert(text);
  let result = 0;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] > lines[i - 1]) result++;
  }
  return result;
}
