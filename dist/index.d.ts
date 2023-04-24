export declare class MultiKeyObject<Key extends {
    [key in keyof Key]: string;
}, Value> implements Map<Key, Value> {
    protected data: Map<string, Value>;
    protected keyOrder: Array<keyof Key> | undefined;
    protected getPrimaryKey(key: Key): string;
    constructor(entries?: readonly (readonly [Key, Value])[] | null);
    clear(): void;
    delete(key: Key): boolean;
    forEach(callbackfn: (value: Value, key: Key, map: Map<Key, Value>) => void, thisArg?: any): void;
    get(key: Key): Value | undefined;
    has(key: Key): boolean;
    set(key: Key, value: Value): this;
    get size(): number;
    entries(): IterableIterator<[Key, Value]>;
    keys(): IterableIterator<Key>;
    values(): IterableIterator<Value>;
    [Symbol.iterator](): IterableIterator<[Key, Value]>;
    [Symbol.toStringTag]: string;
}
