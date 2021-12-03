export function isPositiveInteger(value: unknown): boolean {
  const number = parseFloat(value as string);
  return !(
    Number.isNaN(number) || 
    !Number.isFinite(number) || 
    !Number.isSafeInteger(number) || 
    number < 0
  );
}

export function isNumber(value: unknown): boolean {
  const number = parseFloat(value as string);
  return !Number.isNaN(number) && Number.isFinite(number);
}