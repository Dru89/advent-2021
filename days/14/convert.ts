import { LinkedList } from "./linked-list";

interface Instructions {
  list: LinkedList<string>;
  rules: Map<string, string>;
}

export function convert(text: string): Instructions {
  let template: string | undefined;
  let rules = new Map<string, string>();

  text
    .trim()
    .split("\n")
    .forEach((line) => {
      if (!line.trim()) return;

      const templateMatch = /^(\w+)$/.exec(line);
      const ruleMatch = /^(\w{2}) -> (\w)$/.exec(line);

      if (templateMatch) {
        if (template) {
          throw new Error(
            `Found two templates: "${template}" and "${template[1]}".`
          );
        }
        template = templateMatch[1];
      } else if (ruleMatch) {
        const [, key, value] = ruleMatch;
        if (rules.has(key)) {
          throw new Error(
            `Duplicate rules for "${key}": "${rules.get(key)}" and "${value}".`
          );
        }
        rules.set(key, value);
      } else {
        throw new Error(`Unknown line: "${line}"`);
      }
    });

  if (!template || rules.size === 0) {
    throw new Error("Invalid input. Either no template or no rules.");
  }

  return {
    list: new LinkedList(template),
    rules,
  };
}

export function cycle(
  list: LinkedList<string>,
  rules: Map<string, string>,
  times = 1
) {
  for (let t = 0; t < times; t++) {
    list.forEachNode((node) => {
      if (node.prev) {
        const pair = `${node.prev.value}${node.value}`;
        const newItem = rules.get(pair);
        if (newItem) {
          list.insertBefore(node, newItem);
        }
      }
    });
  }
  return list;
}
