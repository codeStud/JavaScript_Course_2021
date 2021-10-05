'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
  ]);


// Display the transactions on the screen 
// NOTE: Also pass a variable sort (for sort movements feature) with default value as false.
const displayMovements = function(movements, sort = false) {
    // before displaying transactions, clear any previous transactions (otherwise they'd be also shown)
    // just like .textContent = ""
    // innerHTML returns all of the HTML part written inside the containerMovement
    containerMovements.innerHTML = '';

    // NOTE: Don't actually sort the original account movements. Sort only for displaying. => create copy of movements array using slice()
    // If sort == true => store sorted movements COPY in movs else store the movements in movs
    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

    movs.forEach(function(mov, i){
  
      // store the type of transaction as it'll be used to give CSS style of red/green color button to movements
      const type = mov > 0 ? "deposit" : "withdrawal";
  
      // create a string of HTML for each of the transaction and then add them as individual rows in containerMovements
      const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
        <div class="movements__value">₹${mov}</div>
      </div>
      `;
  
      // add the above html element (as a single transaction row) to the movement container box
      // afterbegin is used to add new child html elements on top of previous elements => getting the latest transaction on top.
      // Try 'beginafter' to see the difference.
      containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};
// displayMovements(account1.movements);   // call it in login functionality
  
// console.log(containerMovements.innerHTML);



// Let's calculate total balance, store and print it on the screen
const calcAndDisplayBalance = function(acc) {
    // create a property "balance" for the acc in the parameter
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `₹${acc.balance}`;
}
// calcAndDisplayBalance(account1.movements);           // call it in login functionality



const calcAndDisplaySummary = function(acc) {
    const income = acc.movements.filter(mov => mov > 0)
                            .reduce((acc, mov) => acc + mov, 0);
    
    labelSumIn.textContent = `₹${income}`


    const expense = acc.movements.filter(mov => mov < 0)
                             .reduce((acc, mov) => acc + mov, 0);

    labelSumOut.textContent = `₹${Math.abs(expense)}`;


    // calculate totalInterest if - interest of 1.2% on each deposit && include only those interest which are greater than ₹1
    const interest = acc.movements.filter(mov => mov > 0)                       // filter only deposited amounts
                              .map(deposit => (deposit * acc.interestRate) / 100)            // calculate interest on each deposit
                              .filter((margin, i, arr) => {
                                //   console.log(arr);
                                  return margin >= 1;                       // get the array of interests >= 1
                              })
                              .reduce((acc, margin) => acc + margin, 0);    // take sum of all the interests >= 1
    
    labelSumInterest.textContent = `₹${interest}`;
    
};
// calcAndDisplaySummary(account1.movements);          // call it in login functionality


  
// Let's construct the usernames
const createUsernames = function(accs) {
    // loop through each of the accounts
    accs.forEach(function(ac) {
        // create a new property
        ac.username = ac.owner
            .toLowerCase()      // steven thomas williams
            .split(" ")             // [steven, thomas, williams]
            .map(function(name){    // [stw]
                return name[0];
            })
            .join("");              // stw
    });
};
  
// pass in the accounts array to the function
createUsernames(accounts);


// display the updated UI
const updateUI = function(acc) {
    // Display Movements
    displayMovements(acc.movements);

    // Display Balance
    calcAndDisplayBalance(acc);

    // Display Summary
    calcAndDisplaySummary(acc);
}



//```````````Event Handlers```````````

let currentAccount, timer;

// 1. login functionality

// NOTE: In html forms, "hitting enter key" is same as click event on the button
btnLogin.addEventListener("click", function(e) {
    // NOTE:btnLogin is a form-element. So, on clicking, form is submitted and page is reloaded.
    // console.log("You will see this flash on console and then disapper as page reloads.");

    // So, to prevent form from submitting
    e.preventDefault();
    // console.log("Now you can see this on the console properly.");

    // a. Check if the username is correct
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    // console.log(currentAccount);

    // b. Check if the pin is correct (Don't forget to do .value and to convert it into a number)
    // NOTE: Don't forget to check if the currentAccount exists using "Optional Chaining"
    if(currentAccount?.pin === Number(inputLoginPin.value)){
        // Display UI & Balance summary
        labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`;

        // set opacity to 100 to make UI visible
        containerApp.style.opacity = 100;

        // set the input fields to empty string after logging in
        inputLoginUsername.value = inputLoginPin.value = '';
        // remove the cursor from the password field
        inputLoginPin.blur();

		// clear the timer if someone else was logged in
		if(timer)
			clearInterval(timer);
			
		// and then start a new timer
		timer = startLogoutTimer();

        updateUI(currentAccount);
    }
});



// 2. Transfer money

btnTransfer.addEventListener("click", function(e) {
    // preventing the form to be submitted (see login functionality above)
    e.preventDefault();
    
    // get the amount you wanna transfer
    const amount = Number(inputTransferAmount.value);
    // get the receiver account based on the input in the
    const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

    // clear the transfer input fields
    inputTransferTo.value = inputTransferAmount.value = '';
    // remove cursor/focus from transfer amount field
    inputTransferAmount.blur();

    // certain checks before transferring the amount: 1) valid amount 2) valid receiver account
    if(amount > 0 && currentAccount.balance >= amount 
        && receiverAcc !== undefined && receiverAcc.username !== currentAccount.username){
        // update the accounts
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);
        console.log(receiverAcc);

        // update UI and display it
        updateUI(currentAccount);
    }

	// Reset the timer to 2 min if the user isn't Inactive bcz he tried transferring money
	clearInterval(timer);
	timer = startLogoutTimer();
});



// 3. Close Account

btnClose.addEventListener("click", function(e) {
    e.preventDefault();

    // check if the user has entered correct username and pin in close account form
    if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin){
        // find the index of the currentAccount object in accounts array
        const index = accounts.findIndex(acc => acc.username === currentAccount.username);
        
        // delete the currentAccount object from accounts array (of object)
        accounts.splice(index, 1);      // splice mutates the original array itself
    }

    // clear the close input fields
    inputCloseUsername.value = inputClosePin.value = '';
    // remove cursor/focus from pin field
    inputClosePin.blur();

    // logout the user => (Hide UI here)
    containerApp.style.opacity = 0;
});



// 4. loan amount feature

btnLoan.addEventListener("click", function(e) {
    e.preventDefault();

    const reqAmount = Number(inputLoanAmount.value);

    // Grant a loan if there is at least 1 deposit with at least 10% of the requested loan amount
    if(reqAmount > 0 && currentAccount.movements.some(mov => mov >= reqAmount * 0.1)){
        // add the movement to current account
        currentAccount.movements.push(reqAmount);

        // Update UI
        updateUI(currentAccount);
    }

    inputLoanAmount.value = '';
    inputLoanAmount.blur();

	// Reset the timer to 2 min if the user isn't Inactive bcz he tried to get a loan
	clearInterval(timer);
	timer = startLogoutTimer();
});



// 5. Sort movements feature

let sortedState = true;    // for toggling between sorting movements and then restoring it back
btnSort.addEventListener("click", function(e) {
    e.preventDefault();

    // call displayMovements function with setting sort = true
    displayMovements(currentAccount.movements, sortedState);

    // flip the sortedState variable for the next btnSort click
    sortedState = !sortedState;

});



// 6. Setting logout timer

const startLogoutTimer = function() {

	const tick = function() {
		const min = String(Math.trunc(time / 60)).padStart(2, 0);
		const sec = String(time % 60).padStart(2, 0);

		// In each call, print the remaining time to UI
		labelTimer.textContent = `${min}: ${sec}`;

		// When reached 0 sec, stop timer and log the user out
		if(time == 0){
			clearInterval(timer);

			// Display Login text
			labelWelcome.textContent = `Log in to get started`;

			// set opacity to 0 to make UI invisible
			containerApp.style.opacity = 0;
		}

		// decrease 1 sec
		time--;
	}

	// set time to 2 min
	let time = 120;

	// call the timer immediately and then every second
	tick();
	const timer = setInterval(tick, 1000);

	// NOTE: return the timer variable to be used to clearInterval if in case someone is already logged in.
	// Otherwise if multiple users login one after the another, multiple timers will keep running.
	return timer;
};


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/*

//NOTE:````````Array Methods````````````
// Already known methods - pop(), push(), shift(), unshift(), indexOf(), includes()
let arr = ['a', 'b', 'c', 'd', 'e'];

// 1. slice(startIndex, endIndex)
// slice doesn't mutate the original array, it returns a new array
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice());


// 2. splice(startIndex, endIndex)
// It mutates the original array and returns the extracted elements
let arr2 = [1, 2, 3, 4, 5];
console.log(arr2.splice(2));   // [3, 4, 5]
console.log(arr2);      // [1, 2] bcz elements have been spliced starting from index 2

// remove the last element of array
console.log(arr.splice(-1));


// 3. reverse()
// It returns the reversed array but also mutates the original array
console.log(arr.reverse());
console.log(arr);


// 4. concat()
// Returns the concatinated array & DOESN'T mutate the original array
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);   // same as concat()


// 5. join()
// Returns ELEMENTS of array after joining with the separator. Doesn't mutate the original array.
console.log(letters.join("-"));
console.log(letters);

*/


/*

// NOTE:``````````Looping through array using for-each````````````

// +ve values => deposits  &  -ve values => withdrawls
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for of loop
// for(const movement of movements){
//   if(movement > 0){
//     console.log(`You deposited ${movement}`);
//   }
//   else{
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// }

//NOTE: forEach() is an Higher order function which requires a callback function as an argument telling it what to do.
// forEach will call this callback function

// NOTE: forEach() will be called for each element of the movements[] and for each iteration, will pass the element as 
// an argument to the callback function.

// NOTE: 'continue' and 'break' statements DON'T work in forEach() loop.

movements.forEach(function(movement) {
  if(movement > 0){
    console.log(`You deposited ${movement}`);
  }
  else{
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
});

// NOTE: Along with the element, forEach() also passes the 'index' and the entire array as an argument to the callback function.
// order of the arguments matter, i.e (curElement, index, entireArray)
movements.forEach(function(mov, i, arr) {
  if(mov > 0){
    console.log(`${i+1} You deposited ${mov}`);
  }
  else{
    console.log(`${i+1} You withdrew ${Math.abs(mov)}`);
  }
});

// for (const [i, mov] of movements.entries()) {......}

*/

/*

//NOTE: ````````forEach() with maps and sets````````````

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// value, index, array ~ value, key, map
currencies.forEach(function(value, key, map) {
  console.log(`${key}: ${val}`);
});

const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);

// There is no index/key in sets. But just to keep it consistent, 2nd parameter wasn't omitted and just carries the 
// same value as the first parameter i.e value
currenciesUnique.forEach(function(value, key, set){
  console.log(`${key} : ${value}`);
});

*/


//NOTE: ``````````Array Transformation````````````

// 1. Map() - It's just like forEach() which takes a call back function and returns A NEW Array
// i.e "it maps the values of orginal array to the new array based on the call-back function."

// 2. Filter() - It filters out the values of original array based on the CONDITIONS in the call-back function and returns A NEW array

// 3. Reduce() - It takes the values of original array and reduces it to a single value (like sum, product, min, max etc...)


/*

// NOTE:````````The map method``````````
// NOTE: It must have a return statement.

const eurToUsd = 1.1;

const movementsInUSD = movements.map(function(mov){
  return mov * eurToUsd;
});

console.log(movementsInUSD);

// above functionality using arrow function
// const movementsInUSDArrow = movements.map(mov => mov * eurToUsd);
// console.log(movementsInUSDArrow);

const movementsDescription = movements.map(function(mov, i, arr) {
  return `Movement ${i + 1}: You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(mov)}`;
});

console.log(movementsDescription);


// create an array of all the movements of all the accounts (2-d array)
const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);

*/

/*

// NOTE:````````````The filter method````````````
// NOTE: It must have a return statement.

const depositAmts = movements.filter(function(mov){
    // only the elements with the below value "true" will be filtered out in the new array
    return mov > 0;
});

const withdrawalAmts = movements.filter(mov => mov < 0);

console.log(movements);
console.log(depositAmts);
console.log(withdrawalAmts);

*/


/*

// NOTE:`````````The reduce method````````````

// first parameter in the call-back function of reduce method is "Accumulator" which will store the single value result 
const totalBalance = movements.reduce(function(acc, cur, i, arr) {
    // accumulator stores the result of all the previous operations
    // We need to return the updated accumulator so that it can be used in the next iteration
    console.log(`Iteration ${i}: ${acc}`);
    return acc + cur;

}, 0);      //NOTE: 0 is the initial value of the accumulator

console.log(totalBalance);

// Get the max value
const maxVal = movements.reduce((acc, mov) => {
    if(acc > mov){
        return acc;
    }
    else{
        //NOTE: mov will be stored in accumulator and accumulator will be returned. 
        // Reduce ALWAYS returns accumulator.
        return mov
    }
}, movements[0]);   // NOTE: setting first value as initial value

console.log("Maximum Value: ", maxVal);

const avg = movements.reduce((acc, mov) => acc + mov, 0) / movements.length;
console.log(avg);

*/


/*

// Take all the deposits, conver them to USD and then find total deposited amount
// NOTE: Chaining of all the array transformation methods
// filter() is called on movements[] -> map() is called on output ARRAY of filter() -> reduce() is called on output ARRAY of map()
const eurToUsd = 1.1;
const totalDepositUSD = movements.filter(mov => mov > 0)
                                 .map(mov => mov * eurToUsd)
                                 .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositUSD);

*/


/*

//NOTE:`````````````The Find Method`````````````
// Find method is used to retrieve a single element of an array based on some condition.
// It also takes a callback function which returns a boolean.
// Unlike filter method, it won't return a new array. Find returns the FIRST ELEMENT which satisfies the condition.

const firstWithdrawl = movements.find(mov => mov < 0);
console.log(firstWithdrawl);

// NOTE: accounts is an array of objects. This is the most common pattern of data in JAVASCRIPT 
console.log(accounts);

// NOTE: Using find() we can find an object in the array, based on the property of that object.
// This is very powerful thing to be able to do!!
const account = accounts.find(acc => acc.owner === "Jessica Davis");
console.log(account);


// for(let acc of accounts){
//     if(acc.owner === "Jessica Davis"){
//         console.log(acc);
//     }
// }

*/


/*

// NOTE:``````````Some and Every method````````````

console.log(movements.includes(-130));
// But now, we want to know if there has been any kind of deposit above 1000 in the current account
// NOTE: some() will take a callback function and will return true if any of the elements of the array satisfies condition
const anyDeopsits = movements.some(mov => mov > 1000);
console.log(anyDeopsits);

// NOTE: every() method return true if every element in the callback function returns true
const positiveDeposits = mov => mov > 0;
console.log(account4.movements.every(positiveDeposits));

*/


/*

// NOTE: flat(n) - converts multi-dimentional array to 1-d array.  "n" is the dimention of array
// create an array of all the movements of all the accounts (2-d array)
const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);

// getting all movements in 1-D array
const allMovements = accountMovements.flat();
console.log(allMovements);

// get the total balance of all accounts
console.log(allMovements.reduce((acc, mov) => acc + mov, 0));

*/


/*

// NOTE:``````The sort method``````````
// sort() sorts the original array by MUTATING it. This, it doesn't return a new array.
// NOTE: sort() in JS is made to sort only strings =>

const owners = ['jonas', "zack", "adam"]
console.log(owners.sort());         // WORKS fine!
console.log(movements.sort());      // WON'T be sorted as per numbers 

// NOTE: To sort numbers in JS, give Comparator function
// If you return < 0 => A, B (Keep the order)
// If you return > 0 => B, A (Switch the order)

// NOTE:````Sort Ascending````
// METHOD-1:
// movements.sort((a, b) => {
//     if(a > b)        // 54, 45 (We want to switch the order => return +ve)
//         return 1;
//     if(a < b)       // 45, 54 ( We want to keep the order => return -ve)
//         return -1;
// });
// console.log(movements);

// METHOD-2:
movements.sort((a, b) => a - b);
console.log(movements);



// NOTE:````Sort Descending````
// METHOD-1:
// movements.sort((a, b) => {
//     if(a > b)        // 54, 45 (We want to keep the order => return -ve)
//         return -1;
//     if(a < b)       // 45, 54 ( We want to switch the order => return +ve)
//         return 1;
// });
// console.log(movements);

// METHOD-2:
movements.sort((a, b) => b - a);
console.log(movements);

*/


/*

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

*/


// Exercise-1: calculate how much in total has been deposited in all the bank accounts
const bankDepositSum = accounts.map(acc => acc.movements)
                                .flat()
                                .filter(mov => mov > 0)
                                .reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum);

// Exercise-2: count how many deposits have been done in bank of at least 1000
const countDeposits1000 = accounts.map(acc => acc.movements).flat()
                            .filter(mov => mov >= 1000)
                            .length;
console.log(countDeposits1000);

// NOTE: Execise-3: create an object which contains the sum of the deposits and withdrawls (object de-structuring + reduce method)
const {deposits, withdrawls} = accounts.map(acc => acc.movements).flat()
                        .reduce((sums, cur) => {
                            cur > 0 ? sums.deposits += cur : sums.withdrawls += cur;
                            return sums;
                        }, {deposits: 0, withdrawls: 0});
console.log(deposits, withdrawls);


// NOTE: Exercise-4: "Title-Case" capitalise each words of the given sentence except for the excluded words
const convertTitleCase = function(title) {
    // inner function to capitalise a word
    const capitalise = str => str[0].toUpperCase() + str.slice(1);

    const exceptions = ['a', "and", "an", "the", "but", "or", "on", "in", "is", "with"];

    const titleCase = title.toLowerCase()
                           .split(' ')      // an array of lowercase words
                           .map(word => exceptions.includes(word) ? word : capitalise(word))    // creates a new array of capitalised words
                           .join(' ');      // joins array into a string
    
    return capitalise(titleCase);   // capitalise the first word always.
}

console.log(convertTitleCase("this is a nice title"));
console.log(convertTitleCase("this is another LONG tiTle BUT nOT TOO Long"));
console.log(convertTitleCase("and here is another crazy short title"));