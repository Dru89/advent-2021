import { convert } from "./convert";

export default function process(text: string) {
  let { paper, folds } = convert(text);
  paper = paper.fold(folds[0]);
  return paper.points.length;
}
