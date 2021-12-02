import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

import { fetchText } from "./utils";

interface Module {
  default(text: string): Promise<string | number>;
}

const numbers = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
  "twenty",
  "twenty-one",
  "twenty-two",
  "twenty-three",
  "twenty-four",
  "twenty-five",
];

async function run(day: string, part: "a" | "b"): Promise<string | number> {
  const input = fetchText(numbers.indexOf(day));
  const mod = import(`./days/${day}/${part}`) as Promise<Module>;

  return (await mod).default(await input);
}

const parts = {
  a: ["one", "1"],
  b: ["two", "2"],
};

async function main() {
  const argv = await yargs(hideBin(process.argv)).options({
    day: { choices: numbers, alias: "d", required: true },
    part: { choices: ["a", "b"], alias: "p", required: true },
  }).argv;

  return run(argv.day, argv.part as "a" | "b");
}

main()
  .then((result) => console.log(result))
  .catch((err) => console.error("An error occurred", err));
