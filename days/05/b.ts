import { convert } from "./convert";
import { getPeaks } from "./graph";

export default function process(lines: string) {
  let segments = convert(lines);
  return getPeaks(segments);
}
