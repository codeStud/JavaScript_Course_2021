const billAmount = Number(prompt("What is the bill amount?"));
const tipPercentage = (billAmount >= 50 && billAmount <= 300) ? 0.15 : 0.20;
const tipAmount = billAmount * tipPercentage;
const totalAmount = billAmount + tipAmount;
alert(`Your total amount is ${totalAmount} including a tip of ${tipAmount}`);