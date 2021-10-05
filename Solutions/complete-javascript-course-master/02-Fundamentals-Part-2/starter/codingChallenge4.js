const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

// const calcTip = function (bills) {
//     for (let i = 0; i < bills.length; i++) {
//         if (bills[i] >= 50 && bills[i] <= 300) {
//             tips[i] = bills[i] * 0.15;
//             totals[i] = bills[i] + tips[i];
//         }
//         else {
//             tips[i] = bills[i] * 0.20;
//             totals[i] = bills[i] + tips[i];
//         }
//     }
// }
// calcTip(bills);


const calcTip = function (billAmount) {
    return (billAmount >= 50 && billAmount <= 300) ? billAmount * 0.15 : billAmount * 0.20;
}

for (let i = 0; i < bills.length; i++) {
    const tip = calcTip(bills[i]);
    tips.push(tip);
    totals.push(tip + bills[i]);
}

for (let i = 0; i < bills.length; i++) {
    console.log(`Bill Amount: ${bills[i]} \nTip Amount: ${tips[i]} \nTotal Amount: ${totals[i]}`);
}


const calcAverage = function (arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    return sum / arr.length;
}

let arr = [];
arr = bills;
console.log(calcAverage(arr));