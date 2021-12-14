export class CountMap<Key> extends Map<Key, number> {
  increment(k: Key, amount = 1): this {
    const current = this.get(k) ?? 0;
    return this.set(k, current + amount);
  }
}
