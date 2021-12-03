import * as fs from "fs/promises";
import * as path from "path";

import { fetchText, exists, isReadWrite } from "../utils";

import { numberToWord, wordToNumber } from "./numbers";
import { findUp } from "./find-up";

async function getCacheDir(): Promise<string> {
  const pkg = await findUp("package.json");
  if (!pkg) throw new Error("Could not find the closest package.json file.");
  const dir = path.dirname(pkg);
  return path.join(dir, ".aoc-cache");
}

async function createDirIfNeeded(
  dir: string,
  recursive?: boolean
): Promise<void> {
  if (!(await exists(dir))) {
    await fs.mkdir(dir, { recursive });
  }
  const checks = await Promise.all([
    exists(dir, "directory"),
    isReadWrite(dir),
  ]);

  if (checks.some((res) => !res)) {
    throw new Error(`Can't find or no read/write access to ${dir}.`);
  }
}

export async function getOrFetch(day: string): Promise<string> {
  const dayWord = numberToWord.get(day) ?? day;
  if (!wordToNumber.has(dayWord)) {
    throw new Error(`Unknown day: ${day}`);
  }

  const cacheDir = await getCacheDir();
  await createDirIfNeeded(cacheDir);
  const cacheFile = path.join(cacheDir, `${dayWord}.txt`);
  if (await exists(cacheFile, "file")) {
    if (!(await isReadWrite(cacheFile))) {
      throw new Error(
        `Can't read/write cache file (${cacheFile}) for day ${day}`
      );
    }

    return fs.readFile(cacheFile, { encoding: "utf-8" });
  }

  const dayNumber = wordToNumber.get(dayWord) ?? day;
  if (!numberToWord.has(dayNumber)) {
    throw new Error(`Unknown day: ${day}.`);
  }

  const text = await fetchText(dayNumber);
  await fs.writeFile(cacheFile, text, { encoding: "utf-8" });
  return text;
}
