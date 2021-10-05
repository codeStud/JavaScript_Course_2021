'use strict';

/*
//```````````````Hoisting + TDZ (Watch Namaste JS)``````````````
// NOTE: All of the 'var' 'let' and 'const' are hoisted. But var gets attached to the window object in the "Memory Creation" Phase.
// "let" and "const" are in the separate execution context (Not in global) and remain in Temporal dead zone 
// (i.e they are hoisted (Memory allocated) but they can't be accessed before inititalisation) bcz they aren't in global execution context like var.

console.log(me);
// console.log(job);
// console.log(year);

var me = "Raj"
let job = "SDE"
const year = 1997;
*/


/*
//```````````Properties on window Object`````````````````
var firstName = "Pratik";
let lastName = "Raj";
const job = "SDE";

// NOTE: var creates a property on the "window" (i.e global) object.
// let and const DON'T create property on "window" object and thus it is advisable to use these in place of var
console.log(firstName === window.firstName);
console.log(lastName === window.lastName);
console.log(job === window.job);
*/


/*
//```````````````````````"this" keyword```````````````````
// NOTE: this points to the "window" object, i.e the global object that contains all JS methods
console.log(this);

const calcAge = function (birthYear) {
    console.log(2037 - birthYear);
    // NOTE: function expression do get "this" keyword but it's UNDEFINED
    console.log(this);
};
calcAge(1997);

const calcAgeArrow = birthYear => {
    console.log(2037 - birthYear);
    //NOTE: Arrow functions DON'T get their own "this" keyword. Rather, "this" keyword in arrow funtion points to
    // the "this" of it's PARENT (here global window)
    console.log(this);
}
calcAgeArrow(1997);

const myInfo = {
    year: 1991,
    calcAge: function() {
        // NOTE: "this" keyword will point to the OBJECT which is calling the calcAge()
        console.log(this);
        console.log(2037 - this.year);
    }
};
myInfo.calcAge();

const pratik = {
    year: 1997,
    job: "sde",
};

// NOTE:`````````````` METHOD BORROWING````````````````````
// just copy the function (don't call it)
pratik.calcAge = myInfo.calcAge;
// NOTE: "this" keyword inside calcAge() now points to pratik OBJECT as it's the one calling calcAge()
// Also, pratik object won't get the calcAge() as one of it's properties. It'll just reference to the same calcAge() in heap.
pratik.calcAge();

*/


/*
//````````````````Arguments keyword````````````````
// NOTE: Arrow function doesn't have arguments keyword
const addExpr = function(a, b) {
    console.log(arguments);
    return a + b;
}
addExpr(2, 5);
addExpr(2, 5, 8, 9);

*/


//````````````````````````Primitive-Types VS Objects``````````````````

let lastName = "Williams";
// Store the lastName into another variable.
// A new copy of lastName in created in the stack and will be stored in oldLastName
let oldLastName = lastName;

lastName = "Davis";
console.log("Before Marriage: ", oldLastName);
console.log("After Marriage: ", lastName);


// NOTE: Objects are stored in heap and we have a pointer to them in the stack (reference)
const jessica = {
    firstName: "Jessica",
    lastName: "Williams",
    age: 27,
};

// let's copy the object into another object
// marriedJessica will point to the same object in the heap and won't create another copy
const marriedJessica = jessica;

// NOTE:
// this will change the actual jessica object in the heap
// We are able to change a "const" marriedJessica because -
// marriedJessica is in the stack holding the reference to jessica object in heap. We aren't changing the 
// content of marriedJessica in stack (i.e the reference value) which is a "const". We are changing the value in
// the heap.
marriedJessica.lastName = "Davis";

console.log("After Marriage: ", marriedJessica.lastName);
console.log("Before Marriage: ", jessica.lastName);


// NOTE: If you really want to create a COPY of an object and not just a reference
// Object.assign() joins two objects and returns a new copy of the merged objects
const jessicaCopy = Object.assign({}, jessica);

jessicaCopy.lastName = "Alberto";
console.log("Before Marriage: ", jessica.lastName);
console.log("After Marriage: ", jessicaCopy.lastName);


// ````````````````SHALLOW COPY```````````````
// NOTE: Object.assign() work only on the first level, i.e only a copy of outer object is created. If there
// are inner objects(i.e object inside object), the inner object will still reference to heap original copy

const jessica2 = {
    firstName: "Jessica",
    lastName: "Williams",
    age: 27,
    family: ["Alice", "Bob"],
};

const jessicaCopy2 = jessica2;

// will change family also for jessica2 bcz it's an object in the second level => it's still stored as reference
jessicaCopy2.family.push("Carl");
jessicaCopy2.family.push("Dom");

console.log(jessicaCopy2);
console.log(jessica2);

// NOTE: DEEP CLONING (coying outer objects as well as inner objects) is done by external libraries (No need here)