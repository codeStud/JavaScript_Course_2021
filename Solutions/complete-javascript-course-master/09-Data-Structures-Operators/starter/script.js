'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  Name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // function argument is an object (which will be dynamically DE-STRUCTURED) along with default values
  orderDelivery: function ({starterIndex = 1, time = '20:00', mainIndex = 0, address = "NULL"}) {
    console.log(`Order recieved! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered 
    at ${address} by ${time}`);
  },

  // ARRAY DE-STRUCTURING IS USED (code at line no- #195)
  // orderPasta: function ([ing1, ing2, ing3]) {
  //   console.log(`Here is your pasta with ${ing1}, ${ing2}, ${ing3}`);
  // }
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your pasta with ${ing1}, ${ing2}, ${ing3}`);
  },

  // first arg will be main ingredient, rest all the arguments will be clubbed together under otherIngredient
  // NOTE: ...otherIngredient in function call works as REST PATTERN
  orderPizza: function (mainIngredient, ...otherIngredient){
    console.log("Main Ingredient: ", mainIngredient);
    // NOTE: ...otherIngredient works as spread operator below (common sense)
    console.log("Other Ingredients: ", ...otherIngredient);
  }
    
};


/*

//NOTE: ````````````Array Destructuring````````````
// It is the process of retrieving the elements from the array and storing them in variables easily

const arr = [2, 3, 4];
// x, y, z will be const variables - all assigned the values at corresponding index of the array
const [x, y, z] = arr;

console.log(x, y, z);
console.log(arr);


let [main, secondary] = restaurant.categories;
console.log(main, secondary);     // "Italian", "Pizzaria"

[main, , secondary] = restaurant.categories;
console.log(main, secondary);     // "Italian", "Vegetarian"

//NOTE: ``````````````Switching variables````````````
// Method 1 -  
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

// Method 2 -
[main, secondary] = [secondary, main];
console.log(main, secondary);

//NOTE:````````Easy way to recieve 2 return values from a function call````````
console.log(restaurant.order(2, 0));
const [starter, mainCourse] = restaurant.order(2, 0);
console.log("Starter: ", starter);
console.log("Main Course: ", mainCourse);

//NOTE:```````````Nested Destructuring```````````
const nested = [2, 4, [6, 8]];
const [i, , [j, k]] = nested;
console.log(i, j, k);


//NOTE:`````````Default Values in Array Destructuring`````````
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r); 

*/


/*

//NOTE:`````````````OBJECT DE-Structuring````````````````(USED FOR API CALLS)
// We'll have to write EXACT SAME object-element-names while de-structuring as order DOESN'T matter inside objects (No Indexing) -
//Thus, REVIEW: JS AUTOMATICALLY assigns the values with the "matching-names" 

// Also, order of the object elements don't matter ==> No need to do {name, , ,openingHours}
const {Name, openingHours, categories} = restaurant;
console.log(Name, openingHours, categories);

//NOTE: Storing the object properties with a different name
const {Name: restaurantName, openingHours: hours, categories:tags} = restaurant;
console.log(restaurantName, hours, tags);

//NOTE: Setting default values of the properties
const {menu = [], starterMenu: starters = []} = restaurant;
console.log(menu, starters);


//NOTE: Switching variables
let a = 111;
let b = 222;

const obj = {a: 1, b: 2, c: 3};
// {a, b} = obj      will give SYNTAX ERROR as { } this is code-block and { } = obj means you are assigning something to code block
({a, b} = obj);
console.log(a, b);


//NOTE: Nested Objects
const {fri} = openingHours;  
console.log(fri);

const {fri: {open, close}} = openingHours;
console.log(open, close);

const {fri: {open: openingTime, close: closingTime}} = openingHours;
console.log(openingTime, closingTime);

const {fri: {open: openTime = 0, break: breakTime = 0, close: closeTime = 0}} = openingHours;
console.log(openTime, breakTime, closeTime);


// NOTE: Calling the function orderDelivery and passing the object as argument.
// The function orderDelivery will then "DE-STRUCTURE" the object in the parameter & will "map" the values
// coresponding to the "matching names". NOTE: Thus, NO NEED TO WORRY ABOUT ORDER OF ARGUMENTS PASSED

restaurant.orderDelivery({
  time: '23:30',
  address: "Ranchi, Jharkhand",
  mainIndex: 2,
  starterIndex: 2,
});

*/


/*

//NOTE: `````````````````SPREAD Operator(...)``````````````
// Spread operator can be used when we NEED ARRAY ELEMENTS INDIVIDUALLY. It doesn't create variables for each element.
// It works for all the "iterables" - strings, arrays, maps, sets 
const arr = [3, 4];
const badArr = [1, 2, arr[0], arr[1]];
console.log(badArr);

const newArr = [3, 4, 5, 6];
const goodArr = [1, 2, ...newArr];
console.log(goodArr);
console.log(...goodArr);


// create a newMenu from the mainMenu of the restaurant by adding one more food item
const newMenu = [...restaurant.mainMenu, "Burger"];
console.log(newMenu);


// NOTE: Join two arrays
const wholeMenu = [...restaurant.mainMenu, ...restaurant.starterMenu]; 
console.log(wholeMenu);

const str = "Jonas"
const letters = [...str, ' ', "S."];
console.log(letters);

// NOTE: "..." doesn't work in template literals as it doesn't expect , separated values
// So, `${...letter}` will give syntax error


//NOTE: Another way of calling function which takes multiple args
const ingredients = [
  prompt("Let's Make Pasta! Ingredient-1 ?"), 
  prompt("Let's Make Pasta! Ingredient-1 ?"),
  prompt("Let's Make Pasta! Ingredient-1 ?")
];

// Using Array De-structuring
// restaurant.orderPasta(ingredients);  

// using Spread Operator
restaurant.orderPasta(...ingredients);


// NOTE: Since 2018, spread operator also works on OBJECTS even though they aren't iterables
// Remember- Order doesn't matter in Objects!!!

// Below code makes a COPY of the restaurant object in STACK
const newRestaurant = {foundedIn: 1998, ...restaurant, founder: "Pratik Raj"}
console.log(newRestaurant);

*/


/*

// NOTE:`````````````REST pattern```````````````
// REST operator is used to take individual elements and pack them into an ARRAY / OBJECT (depending how it's used)
// NOTE: Syntax is same as spread operator but ... on the left side of the = (assignment operator)

// REST bcz ... on left side of "="
// ...others will take 3, 4, 5 and pack it into a "NEW" ARRAY
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

// NOTE: Using REST and Spread together
// Note that 2nd element of mainMenu is totally skipped and won't be included in the otherFood variable
const [pizza, , rissoto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(pizza, rissoto, otherFood);

//NOTE: REST element must be the last element because JS will pack everything till end
// This also means that there can only be ONE REST element in a single = operator
// const [pizza, , rissoto, ...otherFood, "Garlic Bread"] will give SYNTAX ERROR


//NOTE: REST element of OBJECTS 
// (order of object elements don't matter. They are matched by exact names)

const {sat, ...weekdays} = restaurant.openingHours;
console.log(sat, weekdays);


// NOTE: ``````Function taking any arbitarary amount of arguments````````
// function sum packs the numbers into an "array"
const sum = function (...numbers) {
  let sumVal = 0;
  for(let i = 0; i < numbers.length; i++){
    sumVal += numbers[i];
  }

  return sumVal;
};

console.log(sum(2, 3));  
console.log(sum(2, 3, 4));
console.log(sum(1, 2, 3, 4, 5));

let x = [23, 5, 7];
console.log(sum(...x));


restaurant.orderPizza("Mushrooms", "Olive", "Onion", "Tomato");
restaurant.orderPizza("Cheese");

*/


/*

//NOTE: ```````````The "for - of" loop`````````````
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for(const item of menu){
  console.log(item);
}

//NOTE: Getting the index as well in the "for-of" loop
//````METHOD-1`````
for(const item of menu.entries()){
  console.log(`Index: ${item[0]} Item: ${item[1]}`);
}

//`````METHOD-2`````` (Using array - destructring in the for loop itself)
for(const [i, el] of menu.entries()){
  console.log(`Index: ${i} Item: ${el}`);
}

*/