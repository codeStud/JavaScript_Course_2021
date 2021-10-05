//```````````````INDEX``````````````````
// 1. Optional chaining
// 2. Sets
// 3. Map
// 4. String


'use strict';
const openingHours = {
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
};

// Data needed for first part of the section
const restaurant = {
    Name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],

    // before ES6 you'd have to mention it like below
    // openingHours: openingHours,

    // but with ES6 - NOTE: "Enhanced Object Literals" (simply write the above object name you're trying to include)
    openingHours,

    order: function(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },

    // function argument is an object (which will be dynamically DE-STRUCTURED) along with default values
    orderDelivery: function ({starterIndex = 1, time = '20:00', mainIndex = 0, address = "NULL"}) {
    console.log(`Order recieved! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered 
    at ${address} by ${time}`);
    },

};


/*

//NOTE: ```````````````Optional Chaining``````````````

// check if restaurant opens on monday and what's the opening time if it does
if(restaurant.openingHours.mon){
    console.log(restaurant.openingHours.mon.open);
}

// But what is even "openingHours" doesn't exist??
if(restaurant.openingHours && restaurant.openingHours.mon){
    console.log(restaurant.openingHours.mon.open);
}

// Above code can get messy. So, ES-20 introduced "optional-chaining" ? for it
// if the property just before ? exists, then only print, otherwise - undefined
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
for(const day of days){
    // the code below will give closed on sat as open for sat = 0 (falsy value)
    // const open = restaurant.openingHours[day]?.open || "closed";

    //NOTE: Use "Nullish-Coaleasing-Operator ??" (Works as || but looks for "null" values and NOT "falsy" values)
    // It was made to use along with the Optional Chaining operator
    const open = restaurant.openingHours[day]?.open ?? "closed";
    console.log(`On ${day}, we open at ${open}`);
}


//NOTE:``````OPTIONAL CHAINING ON METHODS```````````
// check if the method exists or not and then call it
// NOTE: Call the function like restaurant.order?.(0, 1) and not like restaurant.order?(0, 1)
console.log(restaurant.order?.(0, 1) ?? "Method doesn't exist");
console.log(restaurant.orderPizza?.(0, 2) ?? "Method doesn't exist");


// Optional chaining on array
const users = [{name: "Jonas", email: "abc@gmail.com"}];
console.log(users[0]?.name ?? "Array is empty!");

*/


/*

//NOTE: ```````````````Looping Objects: Keys, Values, Entries`````````````````

// 1. Object.keys returns the ARRAY of keys of an object
const properties = Object.keys(openingHours);
console.log(properties);  

let str = `Restaurant is open ${properties.length} days in a week: `;

for(const day of Object.keys(openingHours)){
  str += `${day}, `;
}
console.log(str);

// 2. Object.values returns an ARRAY of the values of an object
const values = Object.values(restaurant.openingHours);
console.log(values);

//NOTE: 3. Object.entries will give an ARRAY of key-value pair (UNlike arrays, here you CAN'T write restaurant.openingHours.entrie())
const entries = Object.entries(restaurant.openingHours);
console.log(entries);

for(const [day, timing] of entries){
  console.log(`Restaurant is open on ${day} from ${timing.open} to ${timing.close}`);
};

// NOTE NOTE: Array + Object De-Structuring at once
for(const [day, {open, close}] of entries){
  console.log(`Restaurant is open on ${day} from ${open} to ${close}`);
};

*/


/*

//NOTE:``````````SETS``````````` (Just like Objects, Order of elements in the set is Irrelevant)
// set is a collection of UNIQUE VALUES
// const orderSet = new Set("An iterable")
const orderSet = new Set ([
  "Pasta",
  "Pizza",
  "Pizza",
  "Risotto",
  "Pasta",
  "Burger",
]);
// NOTE SETS are enclose with { }
console.log(orderSet);    // Returns an SET of unique elements {"Pasta", "Pizza", "Risotto", "Burger"}

const nameSet = new Set ("Pratik Spector");
console.log(nameSet);
console.log(`There are ${nameSet.size} unique characters in your name.`)

//NOTE:```````Set Methods``````````
console.log(orderSet.size);     // Not length & it's a "PROPERTY" and NOT a "METHOD" that's why not size()

console.log(orderSet.has("Pizza"));    // It is a "METHOD" and that's why .has()

console.log(orderSet.add("Bread"));
console.log(orderSet.add("Bread"));

orderSet.delete("Bread");

// orderSet.clear()

//NOTE: In Sets, there are NO INDICES
console.log(orderSet[0]); // Undefined

for(let i of orderSet){
  console.log(i);
}

//NOTE Cleaver-Example
const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"];
// const staffUnique = new Set(staff);
// console.log(staffUnique);
const uniqueStaffArr = [...new Set(staff)];
console.log(uniqueStaffArr);

*/


/*

//NOTE:````````````Maps`````````````
// 1. Just like Objects, Maps is a data structure with key-value pair.
//NOTE: 2. Difference between Objects and Maps -
              // In map - Keys can be of any data type
              // In Objects - Keys are strings

const rest = new Map();
// add a key-value pair to the map and RETURN the updated MAP
rest.set('name', 'Classic Italiano');
rest.set(1, 'Frienze, Italy');
rest.set(2, "Lisbon, Portugal");

// Since set returns updated map
rest
.set("categories", ["Italian", "Pizzaria", "Vegetarian", "Organic"])
.set("open", 11)
.set("close", 23)
.set(true, "We are open")
.set(false, "We are closed");

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const curTime = 21;
//NOTE: Benefit of having true/false key in map -
console.log(rest.get((curTime > rest.get("open") && curTime < rest.get("close"))));


//````````Map Methods```````
console.log(rest.has("categories"));
rest.delete(2);
console.log(rest);
// rest.clear();
console.log(rest.size);

//NOTE: Converting below outputs to an iterable (array) OTHERWISE "MapIterator {"question", 1, 2, 3, "correct", …}" kind of output
// NOTICE how it's NOT like Object.keys(rest), Object.entries(rest) or Object.values(rest).
console.log([...rest.entries()]);
console.log([...rest.keys()]);
console.log([...rest.values()]);

//NOTE: Below code won't work bcz [1, 2] gets space in heap.
rest.set([1, 2], "test");
console.log(rest);
// the below [1, 2] isn't same as above [1, 2] bcz arrays are objects and NOTE objects get memory in Heap.
console.log(rest.get([1, 2]));

// So, do it like - 
const arr = [1, 2];
rest.set(arr, "Test");
console.log(rest.get(arr));

// NOTE: DOM are also Objects. So, it can be passed to maps
rest.set(document.querySelector('h1'), "Heading");
console.log(rest);

*/


/*

//NOTE:````````````````Maps Continued````````````````
// Easier way to create Maps is to create and array inside new Map([]) and then
// create multiple arrays inside that array with 1st element being "key" and 2nd element being "value".
// i.e Arrays-of-Arrays
const question = new Map([
  ["question", "Best programmin language in the world?"],
  [1, "C"],
  [2, "Java"],
  [3, "Javascript"],
  ["correct", 3],
  [true, "Correct! :)"],
  [false, "Wrong! :("]
]);
console.log(question);


//NOTE: ```````````````Convert Objects to maps``````````````
// If in case Object.entries() returns an Array-of-Array => It can be easily converted to Map
console.log(Object.entries(openingHours));

const hoursMap = new Map(Object.entries(openingHours));

console.log(hoursMap);


//NOTE:`````Iteration on Maps``````````
// It's just like objects but for objects, we needed Objects.entries() (to covert it into iterable - array)
// That's because, PLAIN objects are NOT iterables. But Map is AN ITERABLE
console.log(question.get('question'));

for(const [key, value] of question){
  if(typeof key === "number")
    console.log(`Answer ${key}: ${value}`)
}

const answer = Number(prompt("Your Answer? "));
console.log(question.get(answer === question.get("correct")));


//NOTE:``````````Convert Map to Array````````````
console.log([...question]);

*/


const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const airline = "TAP Air Portugal";
const plane = "A320";
  
/*

//NOTE:``````````Working with Strings`````````````

console.log(plane[0]);
console.log(plane[1]);
console.log("B737"[0]);

//NOTE:``````String Methods```````
console.log(airline.length);
console.log(airline.indexOf('r'));    // returns the first index
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal'));

// slice(beginIndex, endIndex); - doesn't include the last index
console.log(airline.slice(4));
console.log(airline.slice(4, 7));

// NOTE: extract the first word from a sentence without knowing the sentence beforehand
console.log(airline.slice(0, airline.indexOf(" ")));

// extract the last word from a sentence without knowing the sentence beforehand
console.log(airline.slice(airline.lastIndexOf(" ") + 1));

// extract the last 2 charatcers from string
console.log(airline.slice(-2));

// extract all but the 1st character from the string
console.log(airline.slice(1, -1));

// Write a function which takes a seat and checks whether it's a middle seat or not
const checkMiddleSeat = function (seat) {
  // B AND E are middle seats
  const s = seat.slice(-1);
  if(s === "B" || s === "E"){
    console.log(`You got a middle seat.`);
  }
  else{
    console.log(`You got lucky!`);
  }
}

checkMiddleSeat("11B");
checkMiddleSeat("23C");
checkMiddleSeat("17E");

*/


/*

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

//NOTE: fix capitalisation in name
const passenger = "joNAS"  // make it "Jonas"
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);


//NOTE: comparing emails (i.e capitalisation/spaces/newlines don't matter for emails)
const email = "hello@jonas.io";
const loginEmail = "   Hello@Jonas.Io\n";     // same email as above

/*
const lowerEmail = loginEmail.toLowerCase();
//NOTE: trim the whitespaces and \n
// there is also trimStart() and trimEnd() which let's you trim whitespaces and \n from beginning/ end of strings

const trimnedEmail = lowerEmail.trim();
console.log(trimnedEmail);

const normalisedEmail = loginEmail.toLowerCase().trim();
console.log(email === normalisedEmail);

//NOTE:`````````Replacing``````````
const priceIndia = "₹7850.50";
const priceUS = priceIndia.replace("₹", "$").replace(".", ",");
console.log(priceUS);

const announcement = "All passengers come to boarding door 23. Boarding door 23!";
console.log(announcement.replace("door", "gate"));

// NOTE:replace all occurances of door with gate
// /door/g => global regex
console.log(announcement.replace(/door/g, "gate"));

// NOTE: String methods that return boolean 
const plane2 = "A320 neo";

console.log(plane2.includes("A320"));
console.log(plane2.includes("Boeing"));

console.log(plane2.startsWith("Air"));
console.log(plane2.startsWith("A32"));

console.log(plane2.endsWith('neo'));

// NOTE:```` Execise: Check if the passenger is allowed to enter the airplane or not````````
const checkBaggage = function (items) {
  // convert the user input to lowercase always
  const baggage = items.toLowerCase();
  if(baggage.includes("knief") || baggage.includes("gun")){
    console.log("You aren't allowed to board");
  }
  else{
    console.log("Welcome aboard!");
  }
}

checkBaggage("I have a laptop, some FOod and a pocket KniEf");
checkBaggage("Socks and CAmerA");
checkBaggage("Got some snacks and a gun for protection");

*/


/*

//````````````Working with strings````````````

//NOTE: split() divides the string on the basis of a separator and returns an ARRAY
console.log("a+very+nice+string".split("+"));

const [firstName, lastName] = "Pratik Raj".split(" ");
console.log(firstName, lastName);

//NOTE: join() combines the array of strings into a single string
const newName = ["Mr.", firstName, lastName].join("-");
console.log(newName);


//NOTE: Capitalise the names

const capitaliseName = function(name) {
  // since multiple words in name and we've to capitalise each word => convert to array
  const names = name.split(" ");

  // declare an empty array to push the capitalised words
  const wordUpper = [];

  for(const word of names){
    wordUpper.push(word[0].toUpperCase() + word.slice(1));
  }

  // join the words in wordUpper to make a string
  const finalName = wordUpper.join(" ");
  console.log(finalName);
}

capitaliseName("pratik kumar singh");
capitaliseName("jonas spector raj");


//NOTE:````````Padding`````````
// pad some characters in the beginning or at the end of the string to make it of desired length
// padStart(desiredFinalLength, paddingCharacter)   or    padEnd(desiredFinalLength, paddingCharacter)
const message = "Go to gate 23";
console.log(message.padStart(25, "+"));


//NOTE: Create a function that takes credit card number, displays only last 4 digits with padding in the
// beginning but total length of the string should be same as the passed value length
const maskCreditCard = function(number){
  // convert to string
  const str = number + '';
  const lastFourChar = str.slice(-4);

  return lastFourChar.padStart(str.length, "*");
}

console.log(maskCreditCard(452346465468734));
console.log(maskCreditCard("6431546423524316"));


//NOTE: repeat()
console.log("pratik".repeat(5));

*/