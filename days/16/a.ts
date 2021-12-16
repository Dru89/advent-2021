import convert, { sumVersion } from "./convert";

export default function process(text: string) {
  return sumVersion([convert(text)]);
}
