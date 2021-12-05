import { Segment } from "./convert";
import Table from "./table";

export class Graph extends Table<number, number, number> {
  #peaks = new Map<number, Set<number>>();

  addPeak([r, c]: [number, number]) {
    let set = this.#peaks.get(r);
    if (!set) {
      set = new Set<number>();
      this.#peaks.set(r, set);
    }
    set.add(c);
  }

  increment([r, c]: [number, number]) {
    const value = this.get([r, c]) ?? 0;
    if (value !== 0) this.addPeak([r, c]);
    this.set([r, c], value + 1);
  }

  get peaks(): number {
    return [...this.#peaks.values()].reduce((memo, val) => memo + val.size, 0);
  }
}

const step = (a: number, b: number) => {
  if (a < b) return 1;
  if (a > b) return -1;
  return 0;
};

export function getPeaks(segments: Segment[]) {
  const graph = new Graph();
  segments.forEach((seg) => {
    let { x, y } = seg[0];
    graph.increment([x, y]);
    while (x !== seg[1].x || y !== seg[1].y) {
      x += step(seg[0].x, seg[1].x);
      y += step(seg[0].y, seg[1].y);
      graph.increment([x, y]);
    }
  });
  return graph.peaks;
}
