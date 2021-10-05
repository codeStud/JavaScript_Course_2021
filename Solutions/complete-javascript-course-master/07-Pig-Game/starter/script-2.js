const score0Element = document.querySelector("#score--0");
const score1Element = document.querySelector("#score--1");
const diceElement = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0Element = document.querySelector("#current--0");
const current1Element = document.querySelector("#current--1");
const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");
const btnNew = document.querySelector(".btn--new");

score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add("hidden");
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let gameOver = false;

const switchPlayer = function() {
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    player0Element.classList.toggle("player--active");
    player1Element.classList.toggle("player--active");
}


btnRoll.addEventListener("click", function() {
    if(! gameOver){
        let diceVal = Math.trunc(Math.random() * 6) + 1;
        diceElement.src = `dice-${diceVal}.png`;
        diceElement.classList.remove("hidden");

        if(diceVal === 1){
            switchPlayer();
        }
        
        else{
            currentScore += diceVal;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;

            if(currentScore + scores[activePlayer] >= 50){
                document.querySelector(`#current--${activePlayer}`).textContent = 0;
                document.querySelector(`#score--${activePlayer}`).textContent = currentScore + scores[activePlayer];
                document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
                diceElement.classList.add("hidden");
                gameOver = true;
            }
        }
    }
});


btnHold.addEventListener("click", function() {
    if(! gameOver){
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
        switchPlayer();
    }
});


btnNew.addEventListener("click", function() {
    if(document.querySelector(`.player--${activePlayer}`).classList.contains("player--winner")){
        document.querySelector(`.player--${activePlayer}`).classList.remove("player--winner");
    }

    gameOver = false;
    activePlayer = 0;
    player0Element.classList.add("player--active");
    player1Element.classList?.remove("player--active");
    currentScore = 0;
    scores[0] = 0;
    scores[1] = 0;
    score1Element.textContent = 0;
    score0Element.textContent = 0;
    current1Element.textContent = 0;
    current0Element.textContent = 0;

    diceElement.classList.add("hidden");
});