import { fetch, isNumber } from '../utils';

async function main() {
  const res = await fetch('1');
  const text = await res.text();
  const lines = text
    .split('\n')
    .map((x) => parseFloat(x.trim()))
    .filter((x) => isNumber(x));

  let result = 0;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] > lines[i-1]) result++;
  }
  return result;
}

main().then((result) => console.log(result));