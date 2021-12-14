export class ListNode<T> {
  list: LinkedList<T> | undefined;
  value: T;
  prev: ListNode<T> | undefined;
  next: ListNode<T> | undefined;

  constructor(
    value: T,
    prev?: ListNode<T> | undefined,
    next?: ListNode<T> | undefined,
    list?: LinkedList<T> | undefined
  ) {
    this.list = list;
    this.value = value;

    if (prev) {
      prev.next = this;
      this.prev = prev;
    }
    if (next) {
      next.prev = this;
      this.next = next;
    }
  }
}

const getExisting = <T>(
  indexOrNode: number | ListNode<T>,
  list: LinkedList<T>
): ListNode<T> => {
  const existing =
    typeof indexOrNode === "number" ? list.getNode(indexOrNode) : indexOrNode;
  if (!existing) {
    throw new Error("Could not find node to insert before.");
  }
  if (existing.list !== list) {
    throw new Error(
      "Can't insert before a node that doesn't belong to this list."
    );
  }
  return existing;
};

const getOrCreate = <T>(
  valueOrNode: T | ListNode<T>,
  list: LinkedList<T>
): ListNode<T> => {
  const newNode =
    valueOrNode instanceof ListNode ? valueOrNode : new ListNode(valueOrNode);

  if (newNode.list) newNode.list.removeNode(newNode);
  newNode.list = list;
  return newNode;
};

type CallbackFn<T, U = T> = (
  value: T,
  index: number,
  array: LinkedList<U>
) => void;
export class LinkedList<T> {
  tail: ListNode<T> | undefined;
  head: ListNode<T> | undefined;
  #size: number = 0;

  constructor(list: Iterable<T>) {
    this.push(...list);
  }

  push(...items: T[]): number {
    for (let i = 0; i < items.length; i++) {
      this.tail = new ListNode(items[i], this.tail, undefined, this);
      if (!this.head) {
        this.head = this.tail;
      }
      this.#size++;
    }
    return this.#size;
  }

  unshift(...items: T[]) {
    for (let i = 0; i < items.length; i++) {
      this.head = new ListNode(items[i], undefined, this.head, this);
      if (!this.tail) {
        this.tail = this.head;
      }
      this.#size++;
    }
    return this.#size;
  }

  pop(): T | undefined {
    if (!this.tail) return undefined;

    const { value } = this.tail;
    this.tail = this.tail.prev;
    if (this.tail) {
      this.tail.next = undefined;
    } else {
      this.head = undefined;
    }
    this.#size--;

    return value;
  }

  shift(): T | undefined {
    if (!this.head) return undefined;

    const { value } = this.head;
    this.head = this.head.next;
    if (this.head) {
      this.head.prev = undefined;
    } else {
      this.tail = undefined;
    }
    this.#size--;

    return value;
  }

  removeNode(node: ListNode<T>): void {
    if (node.list !== this) {
      throw new Error(
        "Trying to remove a node from a list it doesn't belong to."
      );
    }

    if (node.next) node.next.prev = node.prev;
    if (node.prev) node.prev.next = node.next;
    if (this.head === node) this.head = node.next;
    if (this.tail === node) this.tail = node.prev;

    this.#size--;
    node.next = undefined;
    node.prev = undefined;
    node.list = undefined;
  }

  insertBefore(i: number, value: T): void;
  insertBefore(existing: ListNode<T>, value: T): void;
  insertBefore(i: number, newNode: ListNode<T>): void;
  insertBefore(existing: ListNode<T>, newNode: ListNode<T>): void;
  insertBefore(
    indexOrNode: number | ListNode<T>,
    newNodeOrValue: ListNode<T> | T
  ): void {
    const existing = getExisting(indexOrNode, this);
    const newNode = getOrCreate(newNodeOrValue, this);

    if (existing.prev) {
      newNode.prev = existing.prev;
      existing.prev.next = newNode;
    }
    newNode.next = existing;
    existing.prev = newNode;
    if (this.head === existing) this.head = newNode;
    this.#size++;
  }

  addAfter(i: number, value: T): void;
  addAfter(existing: ListNode<T>, value: T): void;
  addAfter(i: number, newNode: ListNode<T>): void;
  addAfter(existing: ListNode<T>, newNode: ListNode<T>): void;
  addAfter(
    indexOrNode: number | ListNode<T>,
    newNodeOrValue: ListNode<T> | T
  ): void {
    const existing = getExisting(indexOrNode, this);
    const newNode = getOrCreate(newNodeOrValue, this);

    if (existing.next) {
      newNode.next = existing.next;
      existing.next.prev = newNode;
    }
    newNode.prev = existing;
    existing.next = newNode;
    if (this.tail === existing) this.tail = newNode;
    this.#size++;
  }

  *[Symbol.iterator](): Iterator<T> {
    for (let walker = this.head; walker != null; walker = walker.next) {
      yield walker.value;
    }
  }

  forEachNode(cb: CallbackFn<ListNode<T>, T>, thisArg?: any): void {
    for (let walker = this.head, i = 0; walker != null; i++) {
      cb.call(thisArg, walker, i, this);
      walker = walker.next;
    }
  }

  forEach(cb: CallbackFn<T>, thisArg?: any): void {
    for (let walker = this.head, i = 0; walker != null; i++) {
      cb.call(thisArg, walker.value, i, this);
      walker = walker.next;
    }
  }

  forEachReverse(cb: CallbackFn<T>, thisArg?: any): void {
    for (let walker = this.tail, i = this.size - 1; walker != null; i--) {
      cb.call(thisArg, walker.value, i, this);
      walker = walker.prev;
    }
  }

  #getForward(n: number): ListNode<T> | undefined {
    let i: number;
    let walker: ListNode<T> | undefined;
    for (walker = this.head, i = 0; walker != null && i < n; i++) {
      walker = walker.next;
    }
    if (i === n && walker != null) {
      return walker;
    }
  }

  #getBackward(n: number): ListNode<T> | undefined {
    let i: number;
    let walker: ListNode<T> | undefined;
    for (walker = this.tail, i = 0; walker != null && i < n; i++) {
      walker = walker.prev;
    }
    if (i === n && walker != null) {
      return walker;
    }
  }

  getNode(n: number): ListNode<T> | undefined {
    return n >= 0 ? this.#getForward(n) : this.#getBackward(Math.abs(n) - 1);
  }

  get(n: number): T | undefined {
    return this.getNode(n)?.value;
  }

  join(joiner: string): string {
    return [...this].join(joiner);
  }

  get size(): number {
    return this.#size;
  }
}
