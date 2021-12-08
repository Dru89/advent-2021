import convert from "./convert";

const SPECIAL = [2, 3, 4, 7];
export default function process(text: string) {
  const lines = convert(text);
  return lines
    .flatMap(([input, output]) => output.flat())
    .filter((light) => SPECIAL.includes(light.length)).length;
}
