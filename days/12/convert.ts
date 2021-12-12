export type Size = "large" | "small";
export class Node {
  #edges = new Set<Node>();
  constructor(public readonly name: string, public readonly size: Size) {}

  connect(node: Node) {
    this.#edges.add(node);
  }

  toString(): string {
    return this.name;
  }

  get edges(): Set<Node> {
    return this.#edges;
  }
}

export class Graph {
  #map = new Map<string, Node>();

  add(nodeName: string): Node {
    const existing = this.#map.get(nodeName);
    if (existing) return existing;

    const node = new Node(
      nodeName,
      nodeName.toUpperCase() === nodeName ? "large" : "small"
    );
    this.#map.set(nodeName, node);
    return node;
  }

  get(nodeName: string): Node | undefined {
    return this.#map.get(nodeName);
  }
}

export function convert(text: string) {
  const graph = new Graph();
  text
    .trim()
    .split("\n")
    .map((line) => {
      const nodes = line.split("-");
      if (nodes.length !== 2) throw new Error(`Unknown node line: ${line}`);
      const [left, right] = nodes.map((name) => graph.add(name));
      left.connect(right);
      right.connect(left);
    });
  return graph;
}
