import * as path from "path";
import { exists } from "../utils";

export async function findUp(name: string): Promise<string | undefined> {
  let dir = path.resolve("");
  const { root } = path.parse(dir);
  const stopAt = path.resolve(dir, root);

  while (true) {
    const resolved = path.resolve(dir, name);
    if (await exists(resolved)) {
      return resolved;
    }

    if (dir === stopAt) {
      return undefined;
    }

    dir = path.dirname(dir);
  }
}
