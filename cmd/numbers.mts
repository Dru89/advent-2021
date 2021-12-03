function invert<K, V>(map: Map<K, V>): Map<V, K> {
  const result = new Map<V, K>();
  map.forEach((value, key) => {
    result.set(value, key);
  });
  return result;
}

export const numberToWord = new Map([
  ["1", "one"],
  ["2", "two"],
  ["3", "three"],
  ["4", "four"],
  ["5", "five"],
  ["6", "six"],
  ["7", "seven"],
  ["8", "eight"],
  ["9", "nine"],
  ["10", "ten"],
  ["11", "eleven"],
  ["12", "twelve"],
  ["13", "thirteen"],
  ["14", "fourteen"],
  ["15", "fifteen"],
  ["16", "sixteen"],
  ["17", "seventeen"],
  ["18", "eighteen"],
  ["19", "nineteen"],
  ["20", "twenty"],
  ["21", "twenty-one"],
  ["22", "twenty-two"],
  ["23", "twenty-three"],
  ["24", "twenty-four"],
  ["25", "twenty-five"],
]);

export const wordToNumber = invert(numberToWord);