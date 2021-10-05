'use strict';

/*
console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 20;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 30;
console.log(document.querySelector('.guess').value);
*/

// define the secret number (Integer from 1 to 20). Keep it "let" as you wanna change it with on play-again
let secretNumber = Math.trunc(Math.random() * 20) + 1;

// start with a score of 20. Keep it "let" as you wanna change it with each wrong guess
let score = 20;
// set the high score
let highScore = 0;

// print the value in the input box on clicking "check" button
document.querySelector('.check').addEventListener('click', function () {

  // get the input from the text box into guess variable
  const guess = Number(document.querySelector('.guess').value); // type conversion to Number (from string)

  // process the input value by the user -
  // 1. Right guess = Display Msg
  // 2. Wrong guess = Display Msg + Decrease the score until 0
  if (!guess) {
    document.querySelector('.message').textContent = 'No Number!😥';
  } 

  else if (guess == secretNumber) {
	  // display the correct number on top.
	  document.querySelector('.number').textContent = secretNumber;
	  // print the msg
	  document.querySelector('.message').textContent = 'Correct Number!🥳🎉';
	  // change the background color (VALUES OF CSS ARE ALWAYS A "STRING" IN JS)
	  document.querySelector('body').style.backgroundColor = '#60b347';
	  // change the output box size
	  document.querySelector(".number").style.width = "30rem";
	  // set the highScore accordingly
	  highScore = Math.max(highScore, score);
	  // Display the highScore
	  document.querySelector(".highscore").textContent = highScore;
  } 

  // refactored code
  else if(guess !== secretNumber){
	if (score > 1) {
		document.querySelector('.message').textContent = guess > secretNumber ? 'Guess is too high!📈':
														'Guess is too low!📉';
		score--;
		document.querySelector('.score').textContent = score;
	} else {
		document.querySelector('.message').textContent = 'You Lost!😭';
		document.querySelector('.score').textContent = 0;
	}	
  }

  /*
  else if (guess > secretNumber) {
	if (score > 1) {
		document.querySelector('.message').textContent = 'Guess is too high!📈';
		score--;
		document.querySelector('.score').textContent = score;
    } else {
		document.querySelector('.message').textContent = 'You Lost!😭';
		document.querySelector('.score').textContent = 0;
    }
  } 

  else {
    if (score > 1) {
		document.querySelector('.message').textContent = 'Guess is too low!📉';
		score--;
		document.querySelector('.score').textContent = score;
    } else {
		document.querySelector('.message').textContent = 'You Lost!😭';
		document.querySelector('.score').textContent = 0;
    }
  }
  */

});


// reset the game on clicking "Again!" button
document.querySelector(".again").addEventListener('click', function () {
	score = 20;
	console.log(score);
	secretNumber = Math.trunc(Math.random() * 20) + 1;
	document.querySelector('.score').textContent = score;
	document.querySelector("body").style.backgroundColor = "#222";
	document.querySelector(".number").style.width = "15rem";
	document.querySelector(".number").textContent = "?";
	
	document.querySelector(".message").textContent = "Start guessing...";
	document.querySelector(".guess").value = "";
});