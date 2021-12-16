import convert, { getValue } from "./convert";

export default function process(text: string) {
  return getValue(convert(text));
}
