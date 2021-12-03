import convert from "./convert";

export default function process(text: string) {
  const lines = convert(text);
  let result = 0;
  for (let i = 3; i < lines.length; i++) {
    if (lines[i] > lines[i - 3]) result++;
  }
  return result;
}
