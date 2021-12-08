export class MapList<K, V> extends Map<K, V[]> {
  add(key: K, ...value: V[]): this {
    const existing = this.get(key) ?? [];
    return this.set(key, [...existing, ...value]);
  }
}
