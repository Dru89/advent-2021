import { fetch, isNumber } from '../utils';

function process(text: string) {
  const lines = text
    .split('\n')
    .map((x) => parseFloat(x.trim()))
    .filter((x) => isNumber(x));

  let result = 0;
  for (let i = 3; i < lines.length; i++) {
    if (lines[i] > lines[i-3]) result++;
  }
  return result;
}

async function main() {
  const res = await fetch('1');
  const text = await res.text();
  return process(text);
}

main().then((result) => console.log(result));