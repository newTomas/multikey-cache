import { MultiKeyObject } from './dist';

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