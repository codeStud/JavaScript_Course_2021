'use strict';

/*

// NOTE: ````````````Default Parameters````````````````
const bookings = [];

const createBooking = function(flightNum, numPassengers = 1, price = 199 * numPassengers) {
    const booking = {
        // flightNum: flightNum,
        // using ENHANCED OBJECT LITERAL
        flightNum,
        numPassengers,
        price,
    };

    console.log(booking);
    bookings.push(booking);
};

createBooking('LH123');
createBooking('LH125', 2, 800);
createBooking('LH125', 4);
// if want to skip number of passengers then just pass undefined. It'll take the default value in the function
createBooking('lh125', undefined, 1000);

*/



/*

//NOTE``````````Pass by Value and Pass by Reference`````````````

// NOTE: JavaScript supports ONLY PASS BY VALUE (and NOT pass by reference)
// It looks like that for objects, we are passing by reference but we are not, because -
// The memory for object is created in heap and the variable is in stack holding the address of the object in heap
// So, in a function call, when this variable is passed, it's VALUE i.e THE ADDRESS of the object in heap is copied
// and thus - call by VALUE and not reference.

// Passing primitive type varible (string, number, boolean...) to functions => creates a copy in stack
// Passing Objects to functions => reference to the same object in the heap is passed
const flight = 'LH124';
const jonas = {
    name: "Jonas Schmedtmann",
    passport: 235479461545,
};

const checkIn = function(flightNum, passenger) {
    // flightNum is passed by value. A new copy is made in the call stack
    flightNum = "LH199";
    // passenger is pointing to the jonas object in heap. Thus it's called passed by refernece
    passenger.name = "Mr." + passenger.name;

    if(passenger.passport === 235479461545){
        alert("Checked in!");
    }
    else{
        alert("Wrong Passport!");
    }
};

checkIn(flight, jonas);
console.log(flight);
console.log(jonas);

*/


//NOTE: ```````````Higher Order Functions````````````

/*

// 1. `````````Function accepting callback functions`````````````
const oneWord = function(str) {
    // remove all the spaces from the word
    return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function(str) {
    const [firstWord, ...otherWords] = str.split(" ");
    return [firstWord.toUpperCase(), ...otherWords].join(" ");
}

// transformer is a higher order function as it takes another function as an argument
const transformer = function(str, fun){
    console.log("Original String: ", str);

    console.log(`Transformed string: ${fun(str)}`);

    // since functions are objects and objects have methods => every functions have some
    // built in methods defined on them. Note that it's .name and not .name() bcz name is a property of function object
    console.log(`Transformed by: ${fun.name}`);
}

// Note that upperFirstWord isn't called here itself. It is passed as a value here since all functions have values.
//NOTE: These functions which are passed as arguments are called "CALLBACK FUNCTIONS" bcz they aren't called immediately
// and rather they are called later by transformer function.

transformer("Javascript is an exciting language!", upperFirstWord);
transformer("Javascript is an exciting language!", oneWord);

// Example 2
const high5 = function() {
    console.log('👋');
}

// addEventListener is also an higher order function as it takes another function as an argument and calls it back later
document.body.addEventListener("click", high5);


// Example 3
// forEach is also an higher order function with high5 as an callback function
['pratik', 'raj', 'spector'].forEach(high5);

*/


/*

// 2. ```````````Functions Returning Functions`````````````

// greet() is also a "Higher Order Function" as it is returning another function.
const greet = function(greeting) {
    return function(name) {
        console.log(`${greeting} ${name}`);
    }
}

// storing the function returned by greet() in greeterHey
const greeterHey = greet("Hey");

// Now calling the returned function which was stored in greeterHey with the argument "name".
// NOTE: 'greeting' is still taken from the previous call to greet() and it works bcz of concept of "Closure" in JS
greeterHey("Pratik");
greeterHey("Raj");

// greet() will return a function and we are calling it immediately with name argument
greet('Hello')('Spector');

// greet function using arrow function and returning function also as an arrow function
const greetArr = (greeting) => (name) => console.log(`${greeting} ${name}`);
greetArr("Welcome")("Harvey");

*/


/*

//NOTE:````````````Call & Apply methods`````````````
const lufthansa = {
    airline: "Lufthansa",
    iatacode: "LH",
    bookings: [],
    // book: function() {}
    // NOTE Using Enhanced Object Literal
    book(flightNum, name){
        console.log(
            `${name} booked a seat on ${this.airline} flight ${this.iatacode}${flightNum}`
        );
        
        // name is entered as enhanced object literal otherwise name: name wud also work
        this.bookings.push({flight: `${this.iatacode}${flightNum}`, name});
    },
};

lufthansa.book(239, "Jonas");
lufthansa.book(635, "Pratik");
console.log(lufthansa);


const indigo = {
    name: "Indigo Airlines",
    iatacode: "IND",
    bookings: [],
    // now we want to add book() here but it isn't a good practice to copy the same code (redundancy)
};

// copy the book method into a varible. Note that we aren't calling lufthansa.book().
// We are just storing the value of the book method of lufthansa in book variable
const book = lufthansa.book;

//NOTE: Below call won't work because 'const book' acts as a regular function and not a method of lufthansa
// So, even though entire lufthansa.book method is copied into 'const book' - "this" keyword inside book() won't work!
// book(23, "Harvey Spector");

//NOTE: Use call() method to tell JS which object should 'this' keyword point to
// call method will call the book function and set "this" keyword to the object passed in the firstParameter

// So, we have EXPLICITYLY set the value of "this" keyword

book.call(indigo, 23, "Harvey Spector");
console.log(indigo);

book.call(lufthansa, 235, "Peter Parker");
console.log(lufthansa);


// NOTE: apply method also works the same way. The only difference is that after the object, it takes the rest
// of the arguments inside an array
const data = [25, "Donna Paulson"];

book.apply(indigo, data);
console.log(indigo);

book.call(lufthansa, ...data);

*/


/*

// NOTE:```````````BIND method`````````````
// bind method also allows us to EXPLICITYLY set the "this" keyword for a function call
// The difference of bind from call&apply is -

// bind doesn't immediately call the function. It returns a new function where "this" keyword is bound to the 
// object passed in bind.

const lufthansa = {
    airline: "Lufthansa",
    iatacode: "LH",
    bookings: [],
    // book: function() {}
    // Using Enhanced Object Literal
    book(flightNum, name){
        console.log(
            `${name} booked a seat on ${this.airline} flight ${this.iatacode}${flightNum}`
        );
        
        // name is entered as enhanced object literal otherwise name: name wud also work
        this.bookings.push({flight: `${this.iatacode}${flightNum}`, name});
    },
};


const indigo = {
    airline: "Indigo-Airlines",
    iatacode: "IND",
    bookings: [],
    // now we want to add book() here but it isn't a good practice to copy the same code (redundancy)
};

const airIndia = {
    airline: "Air-India",
    iatacode: "Air",
    bookings: [],
    // now we want to add book() here but it isn't a good practice to copy the same code (redundancy)
};

const book = lufthansa.book;

const bookIndigo = book.bind(indigo);
const bookAir = book.bind(airIndia);

// NOTE bookIndigo is a normal function and NOT an object method. But "this" keyword is set inside it as indigo
bookIndigo(31, "Louis");

// bookAir is a normal function and not a method. But "this" keyword is set inside it as airIndia
bookAir(55, "Rachel");

// we can still call the book method of lufthansa normally
lufthansa.book(243, "Samantha");



// NOTE: With bind() method apart from setting this keyword, we can also bind other values explicitly

// book needed (flightNum, name). Here we are setting flightNum. So, bookInd777 will only require name
const bookInd777 = book.bind(indigo, 777);  
bookInd777("Jessica Pearson");


//NOTE: Another use of bind keyword is with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function() {
    console.log(this);

    this.planes++;
    console.log(this.planes);
}

// NOTE: Below function will not work as - "this" keyword inside the buyPlanes will point to the
// element calling the buyPlanes i.e the button
// document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane);

// We don't want to call the buyPlan() immediately below so don't use "call()" & use bind()
document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane.bind(lufthansa));


//NOTE:``````Partial Application``````````
// partial application means that we can "pre-set" parameters using bind method (Order of the arguments matter)

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// let's "Pre-set" the VAT tax (Partial Application) at a rate of 23% (this keyword = null)
const addVAT = addTax.bind(null, 0.23);     
// Above addVat is a NEW FUNCTION now, similar to - addVAT = value => value + value * 0.23

console.log(addVAT(1000));
console.log(addVAT(546));


//``````Same thing as above using function returning the function````````
const addTaxRate = function(rate) {
    return function(value){
        return value + value * rate;
    }
}

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(1000));
console.log(addVAT2(546));

*/

/*

//NOTE``````````IIFE (Immediately Invoked Function Expressions)`````````````
// IIFE are used to call a function immediately without saving it somewhere, i.e it's called only once
// and then disappears. You can call an IIFE only once

// IIFE were mainly used for data privacy by defining variables inside them and not letting them being accessed outside
// But now we can simply achieve that by defining let and const variables inside a block { } & no need to create a separate function
// So, IIFE are not much used now for data privacy.

//IIFE
(function() {
    console.log("This is an IIFE. It will run only once");
}) ();

( () => console.log("This is also and IIFE and won't be running again!") ) ();

*/


//NOTE: ```````````` Closure Examples``````````````

// Closure is the property of JS which allows a function to have access to the variables in the execution context
// in which that function was created, even after the execution context has been popped off from the stack.

// do console.dir(greeterHey) -> navigate to scopes, to see the closure property

// Example-1
// greet() is also a "Higher Order Function" as it is returning another function.
const greet = function(greeting) {
    return function(name) {
        console.log(`${greeting} ${name}`);
    }
}

// storing the function returned by greet() in greeterHey
const greeterHey = greet("Hey");

// Now calling the returned function which was stored in greeterHey with the argument "name".
// NOTE: 'greeting' is still taken from the previous call to greet() and it works bcz of concept of "Closure" in JS
greeterHey("Pratik");
greeterHey("Raj");


// Example-2
// this time we are defining a variable 'f' outside of a function
let f;

const g = function() {
    const a = 23;
    // but we are assigning it value inside the function 'g' and not returning it
    f = function() {
        console.log(a * 2);
    };
};

g();
//NOTE: f() will still have access to the variable environment of the execution context in which f was assigned
f();    // prints 46


// now let's re-assign 'f' value inside another function (not returning f() like example 1)
const h = function() {
    const b = 777;
    f = function() {
        console.log(b * 2);
    }
}

h();
//NOTE: f will now close over the variables of h() and not on variables of g()
// So, closure of a function can change when it is re-assigned
f();
console.dir(f);


// example-3
const boardPassengers = function (n, wait) {
    const perGroup = n / 3;

    // setTimeout is used to execute a function after certain miliseconds
    // so, boardPassenger will execute immediately and will be erased from stack
    // but when setTimeout function executes after sometime, it'll still have access to the variables in boardPassenger
    // due to closure.
    setTimeout(function() {
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000);

    console.log(`We start boarding in ${wait} seconds`);
};

boardPassengers(180, 5);

//NOTE: closures have priority over scope-chain. So, if we redefine variable 'perGroup' in global scope, 
// even though boardPassenger execution context has been popped off the stack, setTimeout will still use
// the value from closure property and not the value from the global context
const perGroup = 100;       // This has lesser priority than closure variables => it won't be reflected in setTimeout()
boardPassengers(180, 3);