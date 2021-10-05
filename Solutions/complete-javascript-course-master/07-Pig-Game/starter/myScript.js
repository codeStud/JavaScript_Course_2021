'use strict'

const diceEl = document.querySelector(".dice");

let activePlayer;
let curScore;
let scores;
let playingGame;

const resetGame = function() {
    // active player = 0
    activePlayer = 0
    // current score = 0
    curScore = 0
    // set scores to [0, 0]
    scores = [0, 0]
    // playing game = true;
    playingGame = true;

    // set the initial values to 0
    document.querySelector("#score--0").textContent = 0;
    document.querySelector("#score--1").textContent = 0;
    document.querySelector("#current--0").textContent = 0;
    document.querySelector("#current--1").textContent = 0;

    // highlight player 1 and remove highlight from player 2
    document.querySelector(".player--0").classList.add("player--active");
    document.querySelector(".player--1").classList.remove("player--active");

    // can use classList.toggle() rather than checking contains() in the below cases
    if(document.querySelector(".player--0").classList.contains("player--winner"))
        document.querySelector(".player--0").classList.remove("player--winner");
    
    if(document.querySelector(".player--1").classList.contains("player--winner"))
        document.querySelector(".player--1").classList.remove("player--winner");

    // hide the dice
    diceEl.classList.add("hidden");
}

// start with resetting the game
resetGame();

const switchPlayer = function() {
    // reset current score to 0
    curScore = 0;
    // set active-player score to 0
    document.querySelector(`#current--${activePlayer}`).textContent = curScore;

    // remove the highlight from current player & then highlight the other player
    document.querySelector(".player--0").classList.toggle("player--active");
    document.querySelector(".player--1").classList.toggle("player--active");

    // set the other player as active player
    activePlayer = activePlayer === 0 ? 1 : 0;

};

//`````````````````Roll dice````````````````````
const btnRollEl = document.querySelector(".btn--roll");

btnRollEl.addEventListener("click", function() {
    if(playingGame){

        // generate a random number between 1 to 6
        const randNum = Math.trunc(Math.random() * 6) + 1;
        console.log(randNum);
        // display a random image based on the random number
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${randNum}.png`;

        // if randomNum == 1
        if(randNum === 1){
            switchPlayer();
        }
        else{
            // add to the current score of the active player
            curScore += randNum;
            document.querySelector(`#current--${activePlayer}`).textContent = curScore;

            // winner if score of the active player becomes greater than 20;
            if(scores[activePlayer] + curScore >= 20){
                // display the message on the winner side
                document.querySelector(`#score--${activePlayer}`).textContent = `${scores[activePlayer] + curScore}\nWinner!!`;
                // declare winner by highlighting it with black
                document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
                // hide the dice
                diceEl.classList.add("hidden");
                // disable the game
                playingGame = false;
            }
        } 

    } 
});


//``````````````Hold-Button`````````````
const btnHoldEl = document.querySelector(".btn--hold");

btnHoldEl.addEventListener("click", function() {
    if(playingGame){
        // add current score to the total score of the active player
        scores[activePlayer] += curScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        switchPlayer();
    }
});

//````````````````New Game```````````````
const btnNewEl = document.querySelector(".btn--new");
btnNewEl.addEventListener("click", function() {
    resetGame();
});