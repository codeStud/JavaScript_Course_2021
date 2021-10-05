'use strict';

// selecting the elements
const score0Element = document.querySelector("#score--0");
const score1Element = document.getElementById("score--1");

const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");

const current0Element = document.getElementById("current--0");
const current1Element = document.getElementById("current--1");


const diceElement = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");


// initalising the variables
let currentScore;
let activePlayer;
let scores;
let playing;

const resetGame = function() {
    // active player = 0
    activePlayer = 0
    // current score = 0
    currentScore = 0
    // set scores to [0, 0]
    scores = [0, 0]
    // playing game = true;
    playing = true;

    // set the initial values to 0
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    current0Element.textContent = 0;
    current1Element.textContent = 0;

    // highlight player 1 and remove highlight from player 2
    player0Element.classList.add("player--active");
    player1Element.classList.remove("player--active");

    // NOTE: Remove the winner class from both. If it's there, it'll be removed, otherwise Ignored.
    player0Element.classList.remove("player--winner");
    player1Element.classList.remove("player--winner");

    // hide the dice
    diceElement.classList.add("hidden");
}

// start with resetting the game
resetGame();


const switchPlayer = function() {
    // reset the current score
    currentScore = 0;
    // make the score of current player as 0
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    // make the color darker for current player
    // document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    player0Element.classList.toggle("player--active");

    // switch the player
    activePlayer = activePlayer === 0 ? 1 : 0;
    // make the color of switched player lighter
    // document.querySelector(`.player--${activePlayer}`).classList.add("player--active");
    player1Element.classList.toggle("player--active");
}


//````````````ROLLING THE DICE``````````````
btnRoll.addEventListener("click", function() {
    // carry out below functions only if we are playing the game
    if(playing){
        // 1. Generating a random dice roll
        const diceVal = Math.trunc(Math.random() * 6) + 1; // generate 1 - 6

        // 2. Display dice image
        diceElement.classList.remove("hidden");

        // NOTE: to select random images from the list of images---
        // 3. set the dice image as per the diceVal
        diceElement.src = `dice-${diceVal}.png`;

        // 4. Check for rolled val = 1; 
        // if yes, switch to another player; else add diceVal to current-player score
        if(diceVal === 1){
            switchPlayer();
        }
        else{
            // add to the current score of the active player
            currentScore += diceVal;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;

            // winner if score of the active player becomes greater than 20;
            if(scores[activePlayer] + currentScore >= 20){
                // display the message on the winner side
                document.querySelector(`#score--${activePlayer}`).textContent = `${scores[activePlayer] + currentScore}\nWinner!!`;
                // declare winner by highlighting it with black
                document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
                // hide the dice
                diceElement.classList.add("hidden");
                // disable the game
                playing = false;
            }
        } 
    }
});


//``````````````````HOLDING THE CURRENT SCORE```````````````````
btnHold.addEventListener("click", function() {
    if(playing){
        // add current score to the total score of the active player
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        switchPlayer();
    }
});


//``````````````````NEW GAME`````````````````
const btnNewEl = document.querySelector(".btn--new");
btnNewEl.addEventListener("click", function() {
    resetGame();
});