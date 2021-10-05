'use strict';

/*

///////////////////////////////////////

// NOTE:```````````Constructor Functions and the new Operator````````````````

// NOTE: Constructor functions have been used in JS to simulate classes. There is NO ACTUAL CLASS concept in JS.
// Even the ES6-class concept is based on constructor functions behind the scenes. ES6-classes aren't like C++ classes.

// NOTE: Constructor functions are not special features of JS. They are simply a pattern developed by JS community.

const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this! bcz if you create 1000 objects, every object will have the function & it'll make website slow.
  // Add this method to the prototype object of Person constructor function.
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

// NOTE: These happen when you create a constructor function using the "new" keyword - 
// 1. "new" keyword creates an empty object {}
// 2. function is called, "this-keyword" set to the above newly created empty object {}
// 3. {} linked to prototype
// 4. function automatically returns the object which was created in step-1

const jonas = new Person('Jonas', 1991);
console.log(jonas);

// NOTE: The only difference between a constructor function & a normal function is that constructor function
// is called using "new" keyword.

// Arrow function can't be a constructor function as it doesn't have it's own "this" keyword.

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);

// jonas and matilda are the instances of the Person constructor function
console.log(jonas instanceof Person);   // returns true

Person.hey = function () {
  console.log('Hey there 👋');
  console.log(this);
};
Person.hey();

*/



/*

///////////////////////////////////////
// NOTE:````````````Prototypes```````````````

// Each and every "function" in JS (even the constructor functions) has property called "Prototype".
// Every OBJECT created using the constructor function will get access to all the methods & properties that we
// define in the Prototype Property of the constructor function.

console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// NOTE: Even though jonas and matilda objects don't have calcAge() in them, they can still access it because of
// PROTOTYPAL INHERITANCE, i.e- they can access the methods and properties from the PROTOTYPE-OBJECT of "Person"
console.log(jonas, matilda);
jonas.calcAge();
matilda.calcAge();

// NOTE NOTE NOTE: prototype object isn't a prototype of Person() rather it's the prototype for the objects which
// will be created using Person constructor function. "prototype" is just a property DEFINED in the constructor function.
console.log(jonas.__proto__);   // prints the prototype of the jonas object which is basically the prototype DEFINED on its constructor function.
console.log(jonas.__proto__ === Person.prototype);        // true

console.log(Person.prototype.isPrototypeOf(jonas));     // true
console.log(Person.prototype.isPrototypeOf(matilda));   // true
console.log(Person.prototype.isPrototypeOf(Person));    // NOTE false

// We can also set properties (& not just methods()) on the prototype object
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty('firstName'));   // true
console.log(jonas.hasOwnProperty('species'));     // false bcz it is the property of the prototype

*/



/*

///////////////////////////////////////

// NOTE:```````````Prototypal Inheritance on Built-In Objects``````````````
// Function itself is an object in JS

// Prototype Chain
console.log(jonas.__proto__);     // Person.prototype, i.e prototype property of the Person()
// Object.prototype (top of prototype chain)    
console.log(jonas.__proto__.__proto__);   // Object.prototype, i.e prototype property of the Object() constructor function.
console.log(jonas.__proto__.__proto__.__proto__);   // null

console.dir(Person.prototype.constructor);      // Person, i.e. constructor property of prototype will point back to the Person() itself.


// NOTE: Each array created, "inherits" (NOT copied, it just looks up in the prototype chain) the methods defined in the 
// "prototype property of the Array() constructor function".
const arr = [3, 6, 6, 5, 6, 9, 9]; // new Array === []
console.log(arr.__proto__);     
console.log(arr.__proto__ === Array.prototype);       // true

console.log(arr.__proto__.__proto__);   // Object.prototype


// NOTE: Enhance the functionalities of Array by defining a property to return the unique elements.
// But modifying the prototype of an "built-in object" (like Array) isn't a good idea.
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());    // returns array with unique elements

*/



///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.accelerate();

*/


///////////////////////////////////////
// NOTE:```````````ES6 Classes`````````````
// NOTE: Classes are special types of functions. Thus, just like functions, we've claas expression & class declaration.

// Class expression
// const PersonCl = class {}

// Class declaration
class PersonCl {
  // just like constructor function. All the properties should be mentioned inside the constructor()
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  // Methods will be automatically added to .prototype property (And WON'T be copies inside each object)
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  // getter for class (since class is a function & function is an Object & every object has getter/setter)
  get age() {
    return 2037 - this.birthYear;
  }

  // NOTE: setters/getters are very useful for DATA VALIDATION.
  
  // Set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there 👋');
    console.log(this);
  }

} // class closed

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();      // (Prototypal inheritance)
console.log(jessica.age);

console.log(jessica.__proto__ === PersonCl.prototype);

// NOTE: setting explicitly the greet method on prototype object. But no need to do it like this.
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet();


// NOTE NOTE:
// 1. Classes are NOT hoisted
// 2. Classes are first-class citizens (just like functions) => i.e, we can pass them to functions & return them from functions.
// 3. Classes are executed in strict mode

const walter = new PersonCl('Walter White', 1965);
// PersonCl.hey();



/*

///////////////////////////////////////
// NOTE:```````````Setters and Getters```````````````
// 1. Every Object in JS can have setter & getter properties.
// 2. 

const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

// The difference from normal object method is that for Object method, we'd have called it like account.latest()
// But getter makes the method as another property of the object & thus - account.latest is the way.
console.log(account.latest);

// The difference from normal object method is that for Object method, we'd have called it like account.latest(50);
// But setter makes the method as another property of the object & thus - account.latest = 50 is correct.
account.latest = 50;
console.log(account.movements);

*/


/*

///////////////////////////////////////
// NOTE: ```````````Object.create`````````````
// We use Object.create to manually set the prototype of an object to any other object that we want.
// 1. The concept of prototypal inheritance exists.
// 2. "new" keyword and constructor functions DON'T EXIST in Object.create

// writing the methods which we want in the prototype of the object
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// NOTE: NOTE: PersonProto will be the prototype of the new object "steven"
const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);    // returns true

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);   // note that this isn't a constructor function. It's just a normal object method.
sarah.calcAge();

*/



///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

/*

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
console.log(ford.speedUS);
ford.accelerate();
ford.accelerate();
ford.brake();
ford.speedUS = 50;
console.log(ford);

*/





///////////////////////////////////////
// Inheritance Between "Classes": Constructor Functions

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);


///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// Link the prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}`
  );
};

const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
console.log(tesla);
tesla.brake();
tesla.accelerate();


///////////////////////////////////////
// Inheritance Between "Classes": ES6 Classes

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there 👋');
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first!
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();


///////////////////////////////////////
// Inheritance Between "Classes": Object.create

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  // BUG in video:
  // console.log(`My name is ${this.fullName} and I study ${this.course}`);
  
  // FIX:
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();


///////////////////////////////////////
// Encapsulation: Protected Properties and Methods
// Encapsulation: Private Class Fields and Methods

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (there is also the static version)

class Account {
  // 1) Public fields (instances)
  locale = navigator.language;

  // 2) Private fields (instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    // Protected property
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3) Public methods

  // Public interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    // if (this.#approveLoan(val)) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this;
    }
  }

  static helper() {
    console.log('Helper');
  }

  // 4) Private methods
  // #approveLoan(val) {
  _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

// acc1._movements.push(250);
// acc1._movements.push(-140);
// acc1.approveLoan(1000);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements());
console.log(acc1);
Account.helper();

// console.log(acc1.#movements);
// console.log(acc1.#pin);
// console.log(acc1.#approveLoan(100));

// Chaining
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());
*/

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

/*
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);
// console.log(rivian.#charge);
rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();

console.log(rivian.speedUS);
*/
