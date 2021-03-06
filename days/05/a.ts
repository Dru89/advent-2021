import { convert } from "./convert";
import { getPeaks } from "./graph";

export default function process(lines: string) {
  let segments = convert(lines);

  // only take the horizontal and vertical ones.
  segments = segments.filter(
    (seg) => seg[0].x === seg[1].x || seg[0].y === seg[1].y
  );

  return getPeaks(segments);
}
