export default class FishManager {
  #cycle: Array<number>;
  #hold: Array<number>;

  constructor(cycle: number, hold: number) {
    this.#cycle = new Array<number>(cycle).fill(0);
    this.#hold = new Array<number>(hold).fill(0);
  }

  get duration(): number {
    return this.#cycle.length;
  }

  get size(): number {
    const sum = (arr: number[]) => arr.reduce((memo, val) => memo + val, 0);
    return sum(this.#cycle) + sum(this.#hold);
  }

  add(...fish: number[]) {
    fish.forEach((f) => {
      if (f >= this.duration) {
        throw new Error(`Period can't be longer than ${this.duration}`);
      }
      this.#cycle[f]++;
    });
  }

  rotate(days: number) {
    for (let i = 0; i < days; i++) {
      const ready = this.#cycle.shift();
      const newFish = this.#hold.shift();

      if (ready == null) throw new Error(`Expected cycle to not be empty.`);
      if (newFish == null) throw new Error(`Expected hold to not be empty.`);

      this.#hold.push(ready);
      this.#cycle.push(ready + newFish);
    }
  }
}
