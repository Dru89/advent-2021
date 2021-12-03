import { convert, ones } from "./helpers";

export default function process(text: string) {
  const lines = convert(text);

  let oxy = lines;
  let co2 = lines;
  let pos = 0;

  while ((oxy.length > 1 || co2.length > 1) && pos < lines[0].length) {
    if (oxy.length > 1) {
      const bits = ones(oxy)[pos];
      const most = bits >= oxy.length / 2 ? "1" : "0";
      oxy = oxy.filter((line) => line[pos] === most);
    }
    if (co2.length > 1) {
      const bits = ones(co2)[pos];
      const least = bits < co2.length / 2 ? "1" : "0";
      co2 = co2.filter((line) => line[pos] === least);
    }
    pos++;
  }

  if (oxy.length !== 1 && co2.length !== 1) {
    throw new Error(
      `Something went wrong. [${oxy.join(",")}] [${co2.join(",")}]`
    );
  }

  return parseInt(oxy[0], 2) * parseInt(co2[0], 2);
}
