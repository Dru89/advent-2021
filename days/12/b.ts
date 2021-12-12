import { convert, Node } from "./convert";

class Visit {
  constructor(
    public readonly path: Node[],
    public readonly hasVisitedSmallCaveTwice = false
  ) {}

  canVisit(node: Node): boolean {
    if (node.size === "large") return true;
    if (node.name === "start") return false;
    if (this.path.includes(node)) return !this.hasVisitedSmallCaveTwice;
    return true;
  }

  visit(node: Node): Visit | undefined {
    if (!this.canVisit(node)) return undefined;

    const twice = node.size === "small" && this.path.includes(node);
    return new Visit(
      this.path.concat([node]),
      this.hasVisitedSmallCaveTwice || twice
    );
  }

  get last(): Node {
    return this.path[this.path.length - 1];
  }

  toString() {
    return `[${this.path.map((n) => n.toString()).join(",")}] ${
      this.hasVisitedSmallCaveTwice
    }`;
  }
}

const isVisit = (x: unknown): x is Visit => x instanceof Visit;

export default function process(text: string) {
  const graph = convert(text);
  const start = graph.get("start");
  if (start == null) throw new Error(`No start node in graph:\n${text}`);

  const paths = [new Visit([start])];
  const complete: Visit[] = [];

  while (paths.length !== 0) {
    const path = paths.shift()!;

    if (path.last.name === "end") {
      complete.push(path);
      continue;
    }

    const newPaths = [...path.last.edges]
      .map((next) => path.visit(next))
      .filter(isVisit);

    paths.push(...newPaths);
  }

  return complete.length;
}
