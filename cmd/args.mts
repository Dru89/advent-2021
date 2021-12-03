import { Arguments, Options } from "yargs";
import { hideBin } from "yargs/helpers";
import yargs from "yargs";

import { wordToNumber, numberToWord } from "./numbers.mjs";

function coerceDay(arg: string): string {
  const replaced = arg.toLowerCase().trim().replace(/\s+/g, "-");
  if (wordToNumber.has(replaced)) return replaced;
  const word = numberToWord.get(replaced);
  if (word) return word;
  throw new Error(
    `Unknown format for day: ${arg}. Day must be a valid number between 1-25.`
  );
}

function coercePart(arg: string): "a" | "b" {
  const replaced = arg.toLowerCase().trim().replace(/\s+/g, "-");
  if (["a", "one", "1"].includes(replaced)) return "a";
  if (["b", "two", "2"].includes(replaced)) return "b";
  throw new Error(
    `Unknown format for part: ${arg}. Part must be either "a" or "b".`
  );
}

interface Args {
  day: string;
  part: "a" | "b";
}

export default function args(): Arguments<Args> | Promise<Arguments<Args>> {
  return yargs(hideBin(process.argv)).command<Args>(
    "$0 <day> <part>",
    "run the app for a specific day and part",
    (y) => {
      y.positional("day", {
        describe: "The day of the puzzle (between 1 and 25)",
        type: "string",
        coerce: coerceDay,
      }).positional("part", {
        describe: "Part one or two of the puzzle.",
        type: "string",
        coerce: coercePart,
      });
    }
  ).argv;
}
