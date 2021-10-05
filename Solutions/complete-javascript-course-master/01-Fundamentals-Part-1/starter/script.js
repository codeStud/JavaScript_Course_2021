/*
********* INDEX **********
1. Variables
2. Dynamic Typing
3. Operators
4. Template Literal
5. Type Conversion & Coercion
6. Mathemcatical Operators
7. Prompt
8. SWITCH-CASE
9. Ternary Operator
*/

/*
let js = "amazing";
console.log(10 + 20 + 20 + 20);

let firstName = "Pratik";
let lastName = "Raj";
console.log(firstName + " " + lastName);
*/

/*

//```````````Dynamic Typing``````````````
let javascriptIsFun = true;
console.log(typeof javascriptIsFun);

javascriptIsFun = "Yes!";
console.log(typeof javascriptIsFun);

//````````````Undefined````````````
let year
console.log(year);
console.log(typeof year);

*/

/*
//````````let```````````(Block scoped)
let age = 30;
age = 32;


//```````````const`````````````
const birthYear = 1997;
// birthYear = 1999;  will cause an error
// const birthDate;    will cause an error as it is NOT initialized


//```````````var````````````(function scoped)
var job = "programmer";
job = "teacher";


//```````No name``````````
// Below variables aren't created in the current "Scope". JS will create below var as properties on the global object
lastName = "Raj";
lastName = "Spector";

*/

/*

//```````````````Operators````````````````
const ageRaj = 2021 - 1997;
console.log(ageRaj);
console.log(ageRaj ** 2);

let x = 20 + 5;
x += 10;
x++;
console.log(x);

//```````````Comparision Operators`````````````
console.log(ageRaj > x);

*/

/*
const firstName = "Harvey";
const job = "SDE";
const birthYear = 1997;
const curYear = 2021;

const myIntro = "I'm " + firstName + ", a " + (curYear - birthYear) + " year old " + job;
console.log(myIntro);

//``````````````Template Literal````````````(written inside backticks ``)
const myNewIntro = `I'm ${firstName}, a ${curYear - birthYear} years old ${job}`;
console.log(myNewIntro);
console.log(`Just a normal string without template literal`);

//````````````JS in Multiline without template literals``````````
console.log("String with \n\
multiple \n\
lines");

//``````````JS in Multiple lines with template literals````````````
console.log(`String with
multiple
lines`);

*/

// const age = 19;
// const isOldEnough = age >= 18;

// if (isOldEnough) {
//     console.log("You can start driving lessons 🚡");
// }

/*
//```````````````Type Conversion```````````````(Explicit)
const inputYear = "1991";
console.log(Number(inputYear) + 18);

console.log(Number("Jonas"));   // NaN (Invalid number)
console.log(typeof (NaN));      // A number

console.log(String(99), 99);

//``````````````Type Coercion`````````````````(Implicit)
console.log("I am " + 23 + " years old");   // 23 will be coerced to string here
console.log('23' + '10' + 3);       // '+' converts to string

console.log(10 + 2 + 3 + "5");    // 15 + "5" = 155 (string)

//all mathematical and logical operators (except +) converts strings to number
console.log('23' - '10' - 3);
console.log('23' * 2);
console.log('24' / 2);
console.log('23' > '18');

let n = '1' + 1;  // "11"
n = n - 1;       // 10
console.log(n, typeof (n));  // 10, Number
*/

/*
// undefined variables are considered falsy
let height;
if(height){
    console.log("Height is defined");
}
else{
    console.log("Height is undefined or 0!");
}
*/

/*
//````` ALWAYS USE THE STRICT COMPARISION OPERATORS ```````

// 18 == "18" => true   ("loose" bcz it performs type coercion before comparing)
// 18 === "18" => false (strict)
// 18 != "18" => false (loose)
// 18 !== "18" => true (strict)

//```````````````PROMPT``````````````(input is considered string)
let favourite = prompt("What is your favourite food?");
console.log(favourite);

favourite = Number(prompt("What is your favourite number?"));
if (favourite === 23) {
    console.log("Awesome!!");
}
else if (favourite === 7) {
    console.log("7 is a cool number");
}
else {
    console.log("Good.");
}
*/

/*
//``````````````SWITCH-CASE```````````````
const day = "Monday";

switch (day) {
    case "Monday":  // day === "Monday" (strict comparision)
        console.log('Plan to eat pizza');
        break;

    case "Tuesday":
        console.log("Take maths class");
        break;

    case "Wednesday":
        console.log("Take singing lessons");
        break;

    default:
        console.log("Not a valid day");
}
*/

/*
//````````````Ternary Conditional Operator`````````````````
const age = 18;
age >= 18 ? console.log("you can drive") : console.log("you can't drive yet");

const drink = age >= 18 ? "Wine 🍷" : "Water 🌊";
console.log(drink);

console.log(`I like to drink ${age >= 18 ? "Wine 🍷" : "Water 🌊"}`);
*/
