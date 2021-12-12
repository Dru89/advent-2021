import { convert, Node } from "./convert";

const last = <T>(arr: T[]) => arr[arr.length - 1];

export default function process(text: string) {
  const graph = convert(text);
  const start = graph.get("start");
  if (start == null) throw new Error(`No start node in graph:\n${text}`);

  const paths = [[start]];
  const complete: Node[][] = [];
  while (paths.length !== 0) {
    const path = paths.shift()!;
    const end = last(path);

    if (end.name === "end") {
      complete.push(path);
      continue;
    }

    const newPaths: Node[][] = [];
    end.edges.forEach((next) => {
      if (next.size === "large" || !path.includes(next)) {
        newPaths.push(path.concat([next]));
      }
    });
    paths.push(...newPaths);
  }

  return complete.length;
}
