const calculateDistance = (arr: number[], to: number) => {
  return arr.reduce((memo, val) => memo + Math.abs(val - to), 0);
};

export default function process(text: string) {
  const positions = text
    .trim()
    .split(",")
    .map((val) => parseInt(val));
  const min = Math.min(...positions);
  const max = Math.max(...positions);

  let minDist = Number.POSITIVE_INFINITY;
  let minVal: number[] = [];
  for (let i = min; i <= max; i++) {
    const distance = calculateDistance(positions, i);
    if (distance < minDist) {
      minVal = [i];
      minDist = distance;
    } else if (distance === minDist) {
      minVal.push(i);
    }
  }

  return minDist;
}
