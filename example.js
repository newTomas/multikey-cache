const { MultiKeyObject } = require("./dist");

const cache = new MultiKeyObject();

//Automatically converts key fields to strings
cache.set({
	a: 123,
	b: "hello",
	c: BigInt("123")
}, {
	d: 333,
});

console.log("cache.get:", cache.get({
	a: "123",
	b: "hello",
	c: "123"
}));

cache.set({
	a: "123",
	b: "hello",
	c: "123"
}, {
	d: 555,
	e: {
		f: BigInt("123")
	}
});

cache.set({
	a: "555",
	b: "hello",
	c: "123"
}, {
	d: 333,
	e: {
		f: BigInt("123")
	}
});

console.log("cache.has:", cache.has({
	a: "555",
	b: "hello",
	c: "123"
}));

console.log("cache.get:", cache.get({
	a: "123",
	b: "hello",
	c: "123"
}));

console.log("for of cache:");
for (let [key, value] of cache) {
	console.log(key, value);
}

console.log("for of cache.keys:");
for (let key of cache.keys()) {
	console.log(key);
}

console.log("for of cache.values:");
for (let value of cache.values()) {
	console.log(value);
}

cache.delete({
	a: "123",
	b: "hello",
	c: "123"
});

console.log("cache.forEach after delete:");
cache.forEach((value, key) => console.log(key, value));

cache.clear();

console.log("cache.forEach after clear:");
cache.forEach((value, key) => console.log(key, value));