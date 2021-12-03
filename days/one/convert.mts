import { isNumber } from "../../utils/index.mjs";

export default function convert(text: string): number[] {
  return text
    .split("\n")
    .map((x) => parseFloat(x.trim()))
    .filter((x) => isNumber(x));
}
