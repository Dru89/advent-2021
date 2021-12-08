export function of<T>(val: Iterable<T>): Set<T> {
  return new Set([...val]);
}

export function union<T>(...sets: Array<Set<T>>): Set<T> {
  if (sets.length === 0) return new Set<T>();
  if (sets.length === 1) return new Set<T>(sets[0]);

  const result = new Set<T>();
  for (let set of sets) {
    for (let item of set) {
      result.add(item);
    }
  }
  return result;
}

export function intersect<T>(...sets: Array<Set<T>>): Set<T> {
  if (sets.length === 0) return new Set<T>();
  if (sets.length === 1) return new Set<T>(sets[0]);

  const [base, ...rest] = sets;
  const result: Set<T> = new Set<T>();
  base.forEach((v) => {
    if (rest.every((set) => set.has(v))) result.add(v);
  });
  return result;
}

export function difference<T>(...sets: Array<Set<T>>): Set<T> {
  if (sets.length === 0) return new Set<T>();
  if (sets.length === 1) return new Set<T>(sets[0]);

  const [base, ...rest] = sets;
  const result: Set<T> = new Set<T>(base);
  const restUnion = union(...rest);
  restUnion.forEach((val) => result.delete(val));
  return result;
}
