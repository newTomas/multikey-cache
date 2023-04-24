"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiKeyCache = void 0;
class MultiKeyCache {
    data = new Map();
    keyOrder;
    getPrimaryKey(key) {
        if (!this.keyOrder)
            this.keyOrder = Object.keys(key).sort();
        return this.keyOrder.map(e => key[e].toString()).join('\x1F');
    }
    constructor(entries) {
        if (entries) {
            this.data = new Map(Array.from(entries, ([key, value]) => [this.getPrimaryKey(key), value]));
        }
    }
    clear() {
        this.data.clear();
    }
    delete(key) {
        const pk = this.getPrimaryKey(key);
        return this.data.delete(pk);
    }
    forEach(callbackfn, thisArg) {
        for (let [key, value] of this.entries()) {
            callbackfn(value, key, this);
        }
    }
    get(key) {
        const pkString = this.getPrimaryKey(key);
        return this.data.get(pkString);
    }
    has(key) {
        const pk = this.getPrimaryKey(key);
        return this.data.has(pk);
    }
    set(key, value) {
        const pkString = this.getPrimaryKey(key);
        this.data.set(pkString, value);
        return this;
    }
    get size() {
        return this.data.size;
    }
    ;
    *entries() {
        if (!this.keyOrder)
            return;
        for (let [pk, value] of this.data) {
            yield [pk.split('\x1F').reduce((acc, cur, i) => ({ ...acc, [this.keyOrder[i]]: cur }), {}), value];
        }
    }
    *keys() {
        for (let [key] of this.entries()) {
            yield key;
        }
    }
    *values() {
        yield* this.data.values();
    }
    [Symbol.iterator]() {
        return this.entries();
    }
    [Symbol.toStringTag] = "Cache";
}
exports.MultiKeyCache = MultiKeyCache;
//# sourceMappingURL=index.js.map