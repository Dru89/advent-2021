import { convert, plot } from "./convert";

export default function process(text: string) {
  let { paper, folds } = convert(text);
  paper = folds.reduce((memo, fold) => memo.fold(fold), paper);
  return plot(paper);
}
