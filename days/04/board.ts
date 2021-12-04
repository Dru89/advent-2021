export class Board {
  private values: Map<number, [number, number]>;
  private perRow: Array<number>;
  private perCol: Array<number>;

  constructor(fields: number[][]) {
    this.values = new Map<number, [number, number]>();
    this.perRow = new Array<number>(fields.length).fill(0);
    this.perCol = new Array<number>(fields[0].length).fill(0);

    fields.forEach((row, i) => {
      row.forEach((val, j) => {
        this.values.set(val, [i, j]);
      });
    });
  }

  mark(value: number): number | null {
    const position = this.values.get(value);
    if (position) {
      const [row, col] = position;
      this.perRow[row]++;
      this.perCol[col]++;
      this.values.delete(value);

      if (this.perRow[row] === this.perCol.length) {
        return this.score(value);
      }
      if (this.perCol[col] === this.perRow.length) {
        return this.score(value);
      }
    }
    return null;
  }

  score(value: number): number {
    const sum = [...this.values.keys()].reduce((memo, val) => memo + val, 0);
    return value * sum;
  }
}
