export default function assert(
  expression: unknown,
  message: string,
): void {
  if (!expression) {
    throw new Error(message);
  }
}