type Point = [number, number];
type Segment = { a: Point; b: Point };

const cross = (p1: Point, p2: Point): number => {
  return p1[0] * p2[1] - p1[1] * p2[0];
};

const sub = (p1: Point, p2: Point): Point => {
  return [p1[0] - p2[0], p1[1] - p2[1]];
};

const intersection = (seg1: Segment, seg2: Segment) => {
  const d1 = sub(seg1.b, seg1.a);
  const d2 = sub(seg2.b, seg2.a);

  const denom = cross(d1, d2);
  const u = cross(sub(seg2.a, seg1.a), d1);
  const t = cross(sub(seg2.a, seg1.a), d2);

  console.log("seg1", seg1);
  console.log("seg2", seg2);
  console.log("u", `${u}/${denom}`, u / denom);
  console.log("t", `${t}/${denom}`, t / denom);
};

export default function process(lines: string) {
  let segments: Segment[] = [];
  lines
    .trim()
    .split("\n")
    .forEach((line) => {
      const [a, b] = line
        .trim()
        .split(" -> ")
        .map(
          (point) =>
            point.split(",").map((p) => parseInt(p)) as [number, number]
        );
      segments.push({ a, b });
    });

  segments = segments.filter(
    (seg) => seg.a[0] === seg.b[0] || seg.a[1] === seg.b[1]
  );

  for (let i = 0; i < segments.length; i++) {
    for (let j = i + 1; j < segments.length; j++) {
      intersection(segments[i], segments[j]);
    }
  }
}
