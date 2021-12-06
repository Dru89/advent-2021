import convert from "./convert";
import FishManager from "./manager";

export default function process(text: string): number {
  const manager = new FishManager(7, 2);
  manager.add(...convert(text));
  manager.rotate(80);
  return manager.size;
}
