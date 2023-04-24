export class MultiKeyObject<Key extends { [key in keyof Key]: string }, Value> implements Map<Key, Value>{
  protected data: Map<string, Value> = new Map();
  protected keyOrder: Array<keyof Key> | undefined;

  protected getPrimaryKey(key: Key): string {
    if (!this.keyOrder) this.keyOrder = (Object.keys(key) as Array<keyof Key>).sort();

    return this.keyOrder.map(e => key[e].toString()).join('\x1F');
  }

  constructor(entries?: readonly (readonly [Key, Value])[] | null) {
    if (entries) {
      this.data = new Map(Array.from(entries, ([key, value]) => [this.getPrimaryKey(key), value]));
    }
  }

  clear(): void {
    this.data.clear();
  }

  delete(key: Key): boolean {
    const pk = this.getPrimaryKey(key);
    return this.data.delete(pk);
  }

  forEach(callbackfn: (value: Value, key: Key, map: Map<Key, Value>) => void, thisArg?: any): void {
    for (let [key, value] of this.entries()) {
      callbackfn(value, key, this);
    }
  }

  get(key: Key): Value | undefined {
    const pkString = this.getPrimaryKey(key);
    return this.data.get(pkString);
  }

  has(key: Key): boolean {
    const pk = this.getPrimaryKey(key);

    return this.data.has(pk);
  }

  set(key: Key, value: Value): this {
    const pkString = this.getPrimaryKey(key);
    this.data.set(pkString, value);

    return this;
  }

  get size(): number {
    return this.data.size;
  };

  *entries(): IterableIterator<[Key, Value]> {
    if (!this.keyOrder) return;

    for (let [pk, value] of this.data) {
      yield [pk.split('\x1F').reduce((acc, cur, i) => ({ ...acc, [this.keyOrder![i]]: cur }), {}) as Key, value];
    }
  }

  *keys(): IterableIterator<Key> {
    for (let [key] of this.entries()) {
      yield key;
    }
  }

  *values(): IterableIterator<Value> {
    yield* this.data.values();
  }

  [Symbol.iterator](): IterableIterator<[Key, Value]> {
    return this.entries();
  }

  [Symbol.toStringTag]: string = "Cache";
}