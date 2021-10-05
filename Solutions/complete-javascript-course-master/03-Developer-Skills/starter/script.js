// Remember, we're gonna use strict mode in all scripts now!
"use strict";

/*
// PROBLEM:
// We work for a company building a smart home thermometer. Our task is:
// "Given an array of temperatures of a day, calculate the temperature amplitude."
// Note that there might be a sensor error at times

// NOTE
//```````STEP-1: Understanding the problem`````````````
// - What is temp amplitude? (Ans: diff b/w min and max)
// - What does a sensor error look like in the array? (Ans: You'll get "error" string)
// - What to do in case of error? (Ans: Ignore the error)

//``````STEP-2: Breaking into smaller sub-problems````````
// - Ignore the sensor errors.
// - Find max value and min value in the error
// - return the differnce between them

//``````STEP-3: Have a pseudo-code (if difficult problems) before writing the code``````````

//``````STEP-4: Do your research on google if you get stuck at a point.```````````

const temperatures = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];

const calcAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];

    if (curTemp === "error") continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }

  return max - min;
};

const amplitude = calcAmplitude(temperatures);
console.log(amplitude);
*/

// Convert celcius to kelvin taking input from user

const celciusToKelvin = function () {
  const measurement = {
    type: "temp",
    unit: "celcius",
    value: prompt("Enter temp in celcius:"),
  };

  // NOTE
  console.table(measurement);

  const kelvin = Number(measurement.value) + 273;
  return kelvin;
};

console.log(celciusToKelvin());
