import dedent from "ts-dedent";

import args from "./args";
import { getOrFetch } from "./cache";
import { numberToWord, wordToNumber } from "./numbers";

interface Module {
  default(text: string): Promise<string | number>;
}

function isModule(mod: unknown): mod is Module {
  if (mod == null || typeof mod !== "object") return false;
  const modx = mod as Module;
  if (typeof modx.default !== "function") return false;
  if (modx.default.length !== 1) return false;
  return true;
}

async function run(day: string, part: "a" | "b"): Promise<string | number> {
  const dayWord = numberToWord.get(day) ?? day;
  if (!wordToNumber.has(dayWord)) {
    throw new Error(`Unknown day: ${dayWord}`);
  }

  const input = getOrFetch(dayWord);
  const moduleName = `../days/${dayWord}/${part}`;
  const mod = await import(moduleName);

  if (!isModule(mod)) {
    throw new Error(dedent`
      Module ${mod} (${moduleName}) does not conform.
      Module must export a default function that takes a string as input.
    `);
  }

  return mod.default(await input);
}

async function main() {
  const argv = await args();
  return run(argv.day, argv.part);
}

main()
  .then((result) => console.log(result))
  .catch((err) => console.error("An error occurred", err));
