'use strict';



//---------------------------------------------------------------------------------------------------

//                                 ----- DIZZY MONSTER -----
//---------------------------------------------------------------------------------------------------


const startBtn = document.querySelector('.start-btn'); 
const gameClearMessage = document.querySelector('.game-clear');
const gameOverMessage = document.querySelector('.game-over');

function init() {
  startBtn.classList.add('js_displayNone');
  gameClearMessage.classList.add('js_displayNone');
  gameOverMessage.classList.add('js_displayNone');
  startBtn.style.opacity = 0.5;
  gameClearMessage.style.opacity = 1;
  gameOverMessage.style.opacity = 1;
} init();


  const cards = document.querySelectorAll('.memory-card');
  cards.forEach(card => {
    card.addEventListener('click', flipCard);
  });

  startBtn.addEventListener('click', function () {
    window.location.reload();
  });

let hasFlippedCard = false; 
let lockBoard = false;
let firstCard, secondCard;
let matched = 0;
let unMatched = 0;


function flipCard() {
    if(lockBoard) return;            
    if(this === firstCard) return;     
  this.classList.add('js_flip');
  if(!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    hasFlippedCard = false;
    secondCard = this;
    checkForMatch();
  }
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === 
    secondCard.dataset.framework;
  isMatch ? matchedCards() : unMatchedCards();
}

function matchedCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  matched++;
  gameClear();
}

function unMatchedCards() {
  lockBoard = true; 
  setTimeout(() => {
    firstCard.classList.remove('js_flip');
    secondCard.classList.remove('js_flip');
    lockBoard = false;
    firstCard = null;
    unMatched++; 
    gameOverCounter();
  }, 1000);  // unflip speed 1500 
}

function gameClear() {
  if(matched === cards.length / 2) {  
    setTimeout(() => {                       
      gameClearMessage.classList.remove('.js_displayNone');
      gameClearMessage.classList.add('js_displayBlock');
      disableCards();
      setTimeout(() => {
        startBtn.classList.remove('.js_displayNone');
        startBtn.classList.add('js_displayBlock');
      }, 3000);
    }, 500);
  }
}

function gameOver() {
  gameOverMessage.classList.remove('.js_displayNone');                                
  gameOverMessage.classList.add('js_displayBlock');                                
  disableCards();                                                     
  setTimeout(() => {                                                
    startBtn.classList.remove('.js_displayNone');
    startBtn.classList.add('js_displayBlock');                          
  }, 1500);  
}

function gameOverCounter() {   
  if(unMatched === 10) {  // game over count !!   
    gameOver();                 
  }                                                             
}

function disableCards() {
  cards.forEach(card => {                       
    card.removeEventListener('click', flipCard);
  });
} // GAME CLEAR. GAME OVER.時に クリックを解除!

function shuffleCards() {
  const number = [];
  for (let i = 0; i < cards.length; i++) {
    number[i] = i;
  }
  number.sort(value => {
    return  0.5 - Math.random();
  });
  // console.log(number);
  cards.forEach(card => {
    const orderNumber = 
    number.splice(Math.floor(Math.random() * number.length), 1);
    card.style.order = orderNumber;
    // console.log(orderNumber);
  });
}
shuffleCards();


//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------























