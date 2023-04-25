import { MultiKeyObject } from "./src/index";

interface Key {
	a: string;
	b: string;
	c: string;
}

interface Value {
	a: number;
	b: string;
	c: bigint;
}

let generator = 0;
let set = 0;

const cache = new MultiKeyObject<Key, Value>();

//v8.writeHeapSnapshot();

console.log("starting...");
const start = Date.now();
for (let i = 0; i < 3_000_000; i++) {
	let start = Date.now();
	const key = {
		a: (Math.random() * Number.MAX_SAFE_INTEGER).toString(),
		b: Math.random().toString(36),
		c: Math.round(Math.random() * Number.MAX_SAFE_INTEGER).toString()
	};
	const value = {
		a: Math.random() * Number.MAX_SAFE_INTEGER,
		b: Math.random().toString(36),
		c: BigInt(Math.round(Math.random() * Number.MAX_SAFE_INTEGER).toString())
	}
	generator += Date.now() - start;

	start = Date.now();
	cache.set(key, value);
	set += Date.now() - start;
}
console.log(Date.now() - start);
//v8.writeHeapSnapshot();
console.log("done");
console.log(generator, set);
console.log(cache);