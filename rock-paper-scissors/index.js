let score = JSON.parse(localStorage.getItem('score')) || {
  wins : 0,
  losses : 0,
  ties : 0
};

updateScoreEl();

const autoPlayBtn = document.querySelector('.js-auto-play-btn');
autoPlayBtn.addEventListener('click', autoPlay);

let isAutoPlay = false;
let intervalId;
function autoPlay() {
  if(!isAutoPlay){
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlay = true;
    autoPlayBtn.innerHTML = 'Stop Playing';
  }else{
    clearInterval(intervalId);
    isAutoPlay = false;
    autoPlayBtn.innerHTML = 'Auto Play';
  }
  }

document.querySelector('.js-rock-btn').addEventListener('click', () => {playGame('rock')});

document.querySelector('.js-paper-btn').addEventListener('click', () => {playGame('rock')});

document.querySelector('.js-scissors-btn').addEventListener('click', () => {playGame('rock')});

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('rock');
  }else if(event.key === 'p'){
    playGame('paper');
  }else if(event.key === 's'){
    playGame('scissors');
  }else if(event.key === 'a'){
    autoPlay();
  }else if(event.key === 'Backspace'){
    resetGame();
  }
});

function playGame(playerMove){
const computerMoves = pickComputerMove();

let result = '';
if(playerMove === 'Scissors'){
if(computerMoves === 'Rock'){
  result = 'You lose';
}else if(computerMoves === 'Paper'){
  result = 'You win';
}else if(computerMoves === 'Scissors'){
  result = 'Tie'; 
}

}else if(playerMove === 'Paper'){
if(computerMoves === 'Rock'){
result = 'You win';
}else if(computerMoves === 'Paper'){
result = 'Tie';
}else if(computerMoves === 'Scissors'){
result = 'You lose';
}

}else{
if(computerMoves === 'Rock'){
  result = 'Tie';
  }else if(computerMoves === 'Paper'){
    result = 'You lose';
  }else if(computerMoves === 'Scissors'){
    result = 'You win';
  }
}

if(result === 'You win'){
  score.wins += 1;
}else if(result === 'You lose'){
  score.losses += 1;
}else if(result === 'Tie'){
  score.ties += 1;
}


localStorage.setItem('score', JSON.stringify(score));

updateScoreEl();

document.querySelector('.js-result').innerHTML = `${result}`;

document.querySelector('.js-moves').innerHTML = `You <img src = "${playerMove}-emoji.png" class="move-icon">  <img = src = "${computerMoves}-emoji.png" class="move-icon"> Computer`;

}

function updateScoreEl(){
document.querySelector('.js-score'). innerHTML = `wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`;
}

function resetGame(){
let resetQuery = '';
const addHtml = `Are you sure you want to reset the score? 
<button class = "js-reset-btn">Yes</button> <button class = "js-noreset-btn">No</button>`;
resetQuery += addHtml;

document.querySelector('.js-reset-query').innerHTML = resetQuery;
document.querySelector('.js-reset-btn').addEventListener('click', () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  document.querySelector('.js-reset-query').innerHTML = '';
  localStorage.removeItem('score');
  updateScoreEl();
});
document.querySelector('.js-noreset-btn').addEventListener('click', () => {
  document.querySelector('.js-reset-query').innerHTML = '';
});
}

document.querySelector('.js-reset-score-btn').addEventListener('click', resetGame);


function pickComputerMove(){
const randomNumber = Math.random();
let computerMoves = '';

if(randomNumber >= 0 && randomNumber < 1/3){
  computerMoves = 'Rock';
}else if(randomNumber >= 1/3 && randomNumber < 2/3){
  computerMoves = 'Paper';
}else if(randomNumber >= 2/3 && randomNumber < 1){
  computerMoves = 'Scissors';
}

return  computerMoves;
}