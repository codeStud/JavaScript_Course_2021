// NOTE:``````````More ways of creating and filling arrays````````````

console.log([1, 2, 3, 4, 5]);
console.log(new Array(1, 2, 3, 4, 5));

// NOTE: Array constructor function with 1 argument DOESN'T work as expected
const x = new Array(7);     // will create an empty array of length 7 
console.log(x);            

// NOTE: fill the x array
// x.fill(1);
// console.log(x);

// fill starting from 3rd index till 5th
x.fill(1, 3, 6);
console.log(x);


// NOTE:````````````Array.from()````````````````
// from method of Array constructor is used to create custom arrays + arrays from other iterables.

//Create an array of length 6 initialised with 0
const customArr = Array.from({ length: 6 }, () => 0);
console.log(customArr);

// create an array of size 100 with 100 random dice rolls
const diceRolls = Array.from({length: 100}, () => Math.trunc(Math.random() * 6) + 1);
console.log(diceRolls);

