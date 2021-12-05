export type Point = { x: number; y: number };
export type Segment = [Point, Point];

export function convert(lines: string): Segment[] {
  return lines
    .trim()
    .split("\n")
    .map<Segment>((line) => {
      const [a, b] = line.split(" -> ").map<Point>((p) => {
        const [x, y] = p.split(",").map((v) => parseInt(v));
        return { x, y };
      });
      return [a, b];
    });
}
