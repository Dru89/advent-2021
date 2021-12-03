import convert from "./convert";

export default function process(text: string) {
  const commands = convert(text);
  let depth: number = 0;
  let position: number = 0;

  commands.forEach(({ direction, amount }) => {
    switch (direction) {
      case "down": {
        depth += amount;
        break;
      }
      case "up": {
        depth -= amount;
        break;
      }
      case "forward": {
        position += amount;
        break;
      }
      default: {
        throw new Error(`Unknown direction: ${direction}`);
      }
    }
  });

  return depth * position;
}
