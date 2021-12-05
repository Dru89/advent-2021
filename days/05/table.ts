export default class Table<R, C, V> implements Map<[R, C], V> {
  private map: Map<R, Map<C, V>> = new Map<R, Map<C, V>>();

  clear(): void {
    return this.map.clear();
  }

  delete([r, c]: [R, C]): boolean {
    const row = this.map.get(r);
    if (!row) return false;
    return row.delete(c);
  }

  forEach(
    callbackfn: (value: V, key: [R, C], map: Map<[R, C], V>) => void,
    thisArg?: any
  ): void {
    this.map.forEach((row, r) => {
      row.forEach((val, c) => {
        callbackfn(val, [r, c], thisArg ?? this);
      });
    });
  }

  get([r, c]: [R, C]): V | undefined {
    return this.map.get(r)?.get(c);
  }

  has([r, c]: [R, C]): boolean {
    return this.map.get(r)?.has(c) ?? false;
  }

  set([r, c]: [R, C], value: V): this {
    let row = this.map.get(r);
    if (!row) {
      row = new Map<C, V>();
      this.map.set(r, row);
    }
    row.set(c, value);
    return this;
  }

  get size(): number {
    return [...this.map.values()]
      .map((row) => row.size)
      .reduce((memo, size) => memo + size, 0);
  }

  *entries(): IterableIterator<[[R, C], V]> {
    for (const rowEntry of this.map.entries()) {
      for (const colEntry of rowEntry[1].entries()) {
        yield [[rowEntry[0], colEntry[0]], colEntry[1]];
      }
    }
  }

  *keys(): IterableIterator<[R, C]> {
    for (const rowEntry of this.map.entries()) {
      for (const colEntry of rowEntry[1].keys()) {
        yield [rowEntry[0], colEntry];
      }
    }
  }

  *values(): IterableIterator<V> {
    for (const rowEntry of this.map.values()) {
      for (const value of rowEntry.values()) {
        yield value;
      }
    }
  }

  [Symbol.iterator](): IterableIterator<[[R, C], V]> {
    return this.entries();
  }

  get [Symbol.toStringTag](): string {
    return `[object Table]`;
  }
}
