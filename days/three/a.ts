import { convert, ones } from "./helpers";

export default function process(text: string) {
  const lines = convert(text);
  const bits = ones(lines);
  const half = lines.length / 2;

  const gamma = new Array<string>(lines[0].length);
  const epsilon = new Array<string>(lines[0].length);
  bits.forEach((bit, i) => {
    gamma[i] = bit > half ? "1" : "0";
    epsilon[i] = bit < half ? "1" : "0";
  });

  return parseInt(gamma.join(""), 2) * parseInt(epsilon.join(""), 2);
}
