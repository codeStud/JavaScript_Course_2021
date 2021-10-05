const input_box = document.querySelector('.guess');
const btn_check = document.querySelector('.check');
const message_label = document.querySelector('.message');
const score_label = document.querySelector('.score');
const highScore_label = document.querySelector('.highscore');
const btn_again = document.querySelector('.again');

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let highScore = 0;
let gameOver = false;

btn_check.addEventListener("click", function() {
    if(gameOver === false){

        let inputNum = input_box.value;
        let curScore = Number(score_label.textContent);
        console.log(curScore);
        if(inputNum === ''){
            message_label.textContent = "🔴No Number";
        }

        else if(curScore == 0){
            message_label.textContent = "🎇You lost!!😭"
            score_label.textContent = 0;
            gameOver = true;
        }

        else if(inputNum < secretNumber){
            message_label.textContent = `Guess too low!📉`
            score_label.textContent = curScore - 1;
        }
        else if(inputNum > secretNumber){
            message_label.textContent = `Guess too high!📈`
            score_label.textContent = curScore - 1;
        }
        else{
            message_label.textContent = `Correct Guess!!🥳🎉`
            if(curScore > highScore){
                highScore = curScore;
                highScore_label.textContent = highScore;
                document.querySelector('.number').textContent = inputNum;
            }
            gameOver = true;
        }
        
    }
});


btn_again.addEventListener("click", function() {
    gameOver = false;
    curScore = 20;
    document.querySelector('.number').textContent = '?';
    input_box.value = '';
    message_label.textContent = "Start guessing...";
    score_label.textContent = curScore;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
});