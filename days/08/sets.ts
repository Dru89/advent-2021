export function of<T>(val: Iterable<T>): Set<T> {
  return new Set([...val]);
}

export function union<T>(iter: Iterable<T>): Set<T>;
export function union<T>(a: Iterable<T>, b: Iterable<T>): Set<T>;
export function union<T>(...iterables: Array<Iterable<T>>): Set<T>;
export function union<T>(...sets: Array<Iterable<T>>): Set<T> {
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

export function intersect<T>(iter: Iterable<T>): Set<T>;
export function intersect<T>(a: Iterable<T>, b: Iterable<T>): Set<T>;
export function intersect<T>(...iterables: Array<Iterable<T>>): Set<T>;
export function intersect<T>(...iterables: Array<Iterable<T>>): Set<T> {
  if (iterables.length === 0) return new Set<T>();
  if (iterables.length === 1) return new Set<T>(iterables[0]);

  const sets = iterables.map((iter) => of(iter));
  const [base, ...rest] = sets;
  const result: Set<T> = new Set<T>();
  base.forEach((v) => {
    if (rest.every((set) => set.has(v))) result.add(v);
  });
  return result;
}

export function difference<T>(iter: Iterable<T>): Set<T>;
export function difference<T>(a: Iterable<T>, b: Iterable<T>): Set<T>;
export function difference<T>(...iterables: Array<Iterable<T>>): Set<T>;
export function difference<T>(...iterables: Array<Iterable<T>>): Set<T> {
  if (iterables.length === 0) return new Set<T>();
  if (iterables.length === 1) return new Set<T>(iterables[0]);

  const sets = iterables.map((iter) => of(iter));

  const [base, ...rest] = sets;
  const result: Set<T> = new Set<T>(base);
  const restUnion = union(...rest);
  restUnion.forEach((val) => result.delete(val));
  return result;
}

export function includes<T>(parent: Iterable<T>, child: Iterable<T>): boolean {
  const cSet = of(child);
  return intersect(parent, cSet).size === cSet.size;
}

export function equal<T>(iter: Iterable<T>): boolean;
export function equal<T>(a: Iterable<T>, b: Iterable<T>): boolean;
export function equal<T>(...iterables: Array<Iterable<T>>): boolean;
export function equal<T>(...iterables: Array<Iterable<T>>): boolean {
  if (iterables.length === 0) return true;
  if (iterables.length === 1) return true;

  const sets = iterables.map((iter) => of(iter));
  const intersection = intersect(...sets);
  return sets.every((set) => set.size === intersection.size);
}
