import { convert, Segment } from "./convert";

type Direction = "horizontal" | "vertical";
type Range = [number, number];

function normalize(r: Range): Range {
  return [Math.min(r[0], r[1]), Math.max(r[0], r[1])];
}

function getSegmentType(seg: Segment): [number, Range, Direction] {
  if (seg[0].x === seg[1].x) {
    return [seg[0].x, normalize([seg[0].y, seg[1].y]), "vertical"];
  }
  if (seg[0].y === seg[1].y) {
    return [seg[0].y, normalize([seg[0].x, seg[1].x]), "horizontal"];
  }
  throw new Error(`Unknown segment type for: ${JSON.stringify(seg)}`);
}

function intersection(r1: Range, r2: Range): number {
  const left = Math.max(r1[0], r2[0]);
  const right = Math.min(r1[1], r2[1]);
  return Math.max(0, right - left + 1);
}

export default function process(lines: string) {
  let segments = convert(lines);

  // only take the horizontal and vertical ones.
  segments = segments.filter(
    (seg) => seg[0].x === seg[1].x || seg[0].y === seg[1].y
  );

  let overlaps = 0;
  for (let i = 0; i < segments.length; i++) {
    const seg1 = segments[i];
    const [val1, r1, dir1] = getSegmentType(seg1);

    for (let j = i + 1; j < segments.length; j++) {
      const seg2 = segments[j];
      const [val2, r2, dir2] = getSegmentType(seg2);

      // lines are parallel
      if (dir1 === dir2) {
        // lines do not share a value, though so can't intersect.
        if (val1 !== val2) {
          continue;
        }

        // otherwise, check for an overlap;
        console.log("range overlap", seg1, seg2, intersection(r1, r2));
        overlaps += intersection(r1, r2);
      }

      // lines are intersecting, see if segments intersect
      if (val2 >= r1[0] && val2 <= r1[1] && val1 >= r2[0] && val2 <= r2[1]) {
        console.log("single overlap", seg1, seg2);
        overlaps++;
      }
    }
  }
  return overlaps;
}
