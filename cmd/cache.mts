import { constants } from "fs";
import * as fs from "fs/promises";
import * as path from "path";

import { fetchText } from "../utils/index.mjs";

import { numberToWord, wordToNumber } from "./numbers.mjs";

async function getCacheDir(): Promise<string> {
  const pkg = await import("pkg-up").then(({ pkgUp }) => pkgUp());
  if (!pkg) throw new Error("Could not find the closest package.json file.");
  const dir = path.dirname(pkg);
  return path.join(dir, ".aoc-cache");
}

async function exists(p: string): Promise<boolean> {
  try {
    await fs.access(p, constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

async function isDirectory(p: string): Promise<boolean> {
  const stat = await fs.stat(p);
  return stat.isDirectory();
}

async function isReadWrite(p: string): Promise<boolean> {
  try {
    await fs.access(p, constants.R_OK | constants.W_OK);
    return true;
  } catch (err) {
    return false;
  }
}

async function createDirIfNeeded(
  dir: string,
  recursive?: boolean
): Promise<void> {
  if (!(await exists(dir))) {
    await fs.mkdir(dir, { recursive });
  }
  const checks = await Promise.all([
    exists(dir),
    isDirectory(dir),
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
  if (await exists(cacheFile)) {
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
