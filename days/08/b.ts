import convert from "./convert";
import solve from "./segments";
import { equal } from "./sets";

export default function process(text: string) {
  const lines = convert(text);
  let sum = 0;
  lines.forEach(([inputs, outputs]) => {
    const solution = solve([...inputs, ...outputs]);
    sum += parseInt(
      outputs.reduce((memo, output) => {
        const result = solution.findIndex((set) => equal(set, output));
        if (result < 0) throw new Error(`Couldn't solve ${output}`);
        return memo + String(result);
      }, "")
    );
  });
  return sum;
}
