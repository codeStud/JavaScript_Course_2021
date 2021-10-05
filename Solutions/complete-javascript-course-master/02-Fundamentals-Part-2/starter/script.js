/*
#############~~~INDEX~~~#############
1. Strict mode
2. Functions (function declaration, function expression, arrow functions)
3. Arrays
4. Objects
5. For loop
6. While loop

*/


// Activate strict mode to avoid accidental errors.
// This forbids us to do certain things + It shows error in situations where JS fails silently w/o this mode
'use strict';

/*
// To realise the use of strict mode, run the code below in normal and strict mode
let hasDriverLiscence = false;
const passTest = true;

if (passTest) {
    // user trying to change the value of the variable but mis-spelt it
    hasDriversLiscence = true;
}

if (hasDriverLiscence) {
    console.log(`You can drive your car`);
}
*/


/*
//````````````````````FUNCTIONS````````````````
function fruitProcessor(apples, oranges) {
    console.log(apples, oranges);
    const juice = `Juice with ${apples} apples and ${oranges} oranges`;
    return juice;
}

const appleJuice = fruitProcessor(5, 1);
console.log(appleJuice);
*/


/*
// ```````````````FUNCTION EXPRESSION```````````````````

// function declaration
function calcAge1(birthYear) {
    const age = 2037 - birthYear;
    return age;
}
const age1 = calcAge1(1991);
console.log(age1);

// write a function without a name (Anonymous function). This will be an expression which returns a value.
// Store this value in a VARIABLE which will be treated as the fuction name & will be used to call the fuction.
// REMEMBER: "Expressions produce some value."

// function expression
// Works in the SAME way as functions. Diff: You can call the function before defining them (HOISTING) but can't do that with expressions.
const calcAge2 = function (birthYear) {
    const age = 2037 - birthYear;
    return age;
}
const age2 = calcAge2(1991);
console.log(age2);
*/


/*
// ``````````````ARROW FUNCTIONS``````````````(DOESN'T SUPPORT "this" keyword)

// calcAge3 is synonymous to function name & is used to call the arrow function
// birthYear is synonymous to the Parameter of the function
// 2037 - birthYear will be returned implicitly (Without return keyword)
const calcAge3 = birthYear => 2037 - birthYear;

// calling the above function
const age = calcAge3(1991);
console.log(age);

const calcAvg = (score1, score2, score3) => (score1 + score2 + score3) / 3;
console.log(calcAvg(50, 60, 70));


// Case 2 : multiple lines of code
const yearsUntilRetirement = birthYear => {
    const age = 2037 - birthYear;
    const retirement = 65 - age;

    // will have to return explicitly if more than 1 line of function
    return retirement;
}
console.log(yearsUntilRetirement(1991));


// Case 3: Multiple parameters
const yearsUntilRetirement2 = (birthYear, firstName) => {
    const age = 2031 - birthYear;
    const retirement = 65 - age;
    return `${firstName} retires after ${retirement} years`;
}

console.log(yearsUntilRetirement2(1991, "Jonas"));
*/


/*
//``````````CODING CHALLENGE 3`````````````
const calcAvg = (score1, score2, score3) => (score1 + score2 + score3) / 3;

const checkWinner = function (avgDolphins, avgKoalas) {
    if (avgDolphins >= 2 * avgKoalas) {
        console.log(`Dolphins win (${avgDolphins} vs ${avgKoalas})`);
    } else if (avgKoalas >= 2 * avgDolphins) {
        console.log(`Koalas win (${avgKoalas} vs ${avgDolphins})`);
    } else {
        console.log("No winner!");
    }
}

const avgDolphins = calcAvg(85, 54, 41);
const avgKoalas = calcAvg(23, 34, 27);

checkWinner(avgDolphins, avgKoalas);
*/


/*
//````````````````ARRAYS````````````````
const friends = ["Adam", "Bob", "Charles"];
console.log(friends);

const years = new Array(1991, 1984, 1990);
console.log(years[years.length - 1]);

const myInfo = ["Pratik", "Raj", 2021 - 1997, "Developer", friends];
console.log(myInfo);


//```````````ARRAY METHODS````````````
friends.push("Dan");        // "push( )" returns the length of the mutated array

friends.unshift("Zeus");       // Insert in beginning

console.log(friends.pop());              // POP from last. Returns the popped element

friends.shift();            // removes the first element

console.log(friends.indexOf("Dan"));

console.log(friends.includes("Egnes"));         // checks if an element is present in the array or not
*/


/*
//```````````````````OBJECTS`````````````````````
const introPratik = {
    firstName: "Pratik",
    lastName: "Raj",
    age: 2021 - 1997,
    job: "Developer",
    friends: ["Adam", "Bob", "Charles"]
};

console.log(introPratik.age);
console.log(introPratik.friends[2]);
console.log(introPratik["friends"][0]);
console.log(introPratik["lastName"]);

const nameKey = "Name";
console.log(introPratik["first" + nameKey]);
console.log(introPratik["last" + nameKey]);

const getValue = prompt("What do you want to know about Pratik?");
//NOTE: If you try the below method (using .) to access the value, you will get "UNDEFINED". There is no getValue key (i.e object property) in introPratik
// console.log(introPratik.getValue);

if (introPratik[getValue]) {
    console.log(introPratik[getValue]);
}
else {
    console.log("This is not the property defined for Pratik");
}

introPratik.location = "India";

// console.log(introPratik.firstName + " has " + introPratik.friends.length + " friends, and his best friend is " + introPratik.friends[0]);
console.log(`${introPratik['firstName']} has ${introPratik.friends.length} friends, and his best friend is ${introPratik['friends'][0]}`);
*/


/*
//```````````````````OBJECT METHODS``````````````````
const myIntro = {
    firstName: "Pratik",
    lastName: "Raj",
    birthYear: 1991,
    job: "Developer",
    friends: ["Adam", "Bob", "Charles"],
    hasDriversLicence: true,

    // calcAge: function (birthYear) {
    //     return 2021 - 1991;
    // }

    // calcAge: function () {
    //     console.log(this);
    //     return 2021 - this.birthYear;
    // }

    calcAge: function () {
        // NOTE: define a new property and store the result
        this.age = 2021 - this.birthYear;
        return this.age;
    },

    getSummary: function () {
        const x = this.hasDriversLicence ? "has a" : "doesn't have a";
        return (`${this.firstName} is a ${this.calcAge()} years old ${this.job}, and he ${x} driver's licence`);
    }

};

// console.log(myIntro.calcAge(myIntro.birthYear));
// console.log(myIntro["calcAge"](myIntro["birthYear"]));
console.log(myIntro.calcAge());
console.log(myIntro.age);
console.log(myIntro.age);

// NOTE that below code is similar to what you did in 'array' friends.push() (& other array methods).
// So, friends (an array) is an object with the property push(). So, ARRAYS ARE OBJECTS IN JS
console.log(myIntro.getSummary());
*/


/*
//`````````````````THE FOR LOOP````````````````
for (let rep = 1; rep < 11; rep++) {
    console.log(`Lifting weights for the ${rep}th time`);
}

const years = [1991, 1997, 1999, 2011];
const ages = [];
for (let i = 0; i < years.length; i++) {
    if (2021 - years[i] < 18) {
        continue;
    }

    ages.push(2021 - years[i]);
}
console.log(ages);
*/


/*
//````````````THE WHILE LOOP`````````````
// Generating random numbers between 1 - 6
let dice = Math.trunc(Math.random() * 6) + 1;

while (true) {
    if (dice === 6) {
        console.log("SUCCESS!!! 🥳");
        break;
    }

    console.log(`You rolled a ${dice}`);
    dice = Math.trunc(Math.random() * 6) + 1;
}
*/