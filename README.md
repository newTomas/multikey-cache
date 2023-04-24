# MultiKeyObject
An implementation of a cache that supports objects as keys. **Keys can contain only strings.**

## Install
```bash
npm install multikey-object
```

## Use
Supports the following methods:

```Slim
set(key, value)     : Sets a value to a key. Key can be an object with string fields. Value can be anything.
get(key)            : Returns the value by key.
has(key)            : Checks for the existence of a key.
delete(key)         : Deletes an entry by key.
clear()             : Deletes everything.

values()            : Returns array of all values.
keys()              : Returns array of all keys.
entries()           : Returns array of all keys and values in format [key, value].
forEach(callbackfn) : Calls callbackfn for each entry. Passes the value, key, and MultiKeyObject instance as arguments.

size                : Returns count of entries.
```

## Examples:

[TypeScript](example.ts):

```typescript
import { MultiKeyObject } from 'multikey-object';

interface Person {
  name: string;
  age: string;
}

const cache = new MultiKeyObject<Person, string>();

const john = { name: 'John', age: "30" };
const jane = { name: 'Jane', age: "25" };

cache.set(john, 'John Doe');
cache.set(jane, 'Jane Doe');

console.log(cache.get(john)); // 'John Doe'
console.log(cache.get(jane)); // 'Jane Doe'
console.log(cache.size); // 2

cache.forEach((value, key) => {
  console.log(`${key.name} is ${key.age} years old and their name is ${value}`);
});

console.log("Change value by key:");

//Finds this key not by reference, but by value and replaces the value.
cache.set({ name: 'John', age: "30" }, 'John Doe Jr');
for (let [key, value] of cache) {
	console.log(`${key.name} is ${key.age} years old and their name is ${value}`);
}
```

[JavaScript](example.js):

```javascript
const { MultiKeyObject } = require("multikey-object");

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
for(let [key, value] of cache){
	console.log(key, value);
}

console.log("for of cache.keys:");
for(let key of cache.keys()){
	console.log(key);
}

console.log("for of cache.values:");
for(let value of cache.values()){
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
```

## License

[MIT](LICENCE)
