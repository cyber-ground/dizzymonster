'use strict';



//----------------------------------------------------------------------------------------------
//*                               ----- DIZZY MONSTER -----
//----------------------------------------------------------------------------------------------


const startBtn = document.querySelector('.start-btn'); 
const gameClearMessage = document.querySelector('.game-clear');
const gameOverMessage = document.querySelector('.game-over');
const container = document.querySelector('.container');
const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard, lockBoard; 
let firstCard, secondCard;
let matched,unMatched;
let touch = false;
let startGame = false;
var bgmHowl = new Howl({src: ['mp3/bgm.mp3'], loop:true, volume: 0.05});
var flipCardHowl = new Howl({src: ['mp3/flipCard.mp3'], volume: 0.5});
var unmatchedHowl = new Howl({src: ['mp3/unmatched.mp3'], volume: 0.5});
var matchedHowl = new Howl({src: ['mp3/matched.mp3'], volume: 0.5});
var gameClearHowl = new Howl({src: ['mp3/gameClear.mp3'], volume: 0.1});
var gameOverHowl = new Howl({src: ['mp3/gameOver.mp3'], volume: 0.1});

//* touchCalloutPreventionEvents ---
container.addEventListener('touchstart', e => e.preventDefault());
cards.forEach(card => {
  card.addEventListener('touchstart', e => e.preventDefault());
});
gameClearMessage.addEventListener('touchstart', e => e.preventDefault());
gameOverMessage.addEventListener('touchstart', e => e.preventDefault());

startBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  startBtn.click();
});

const imgs = document.querySelectorAll('img');
imgs.forEach(img => {
  img.addEventListener('touchstart', (e) => {
    if(startGame) {
      if(!touch) { e.stopPropagation()}
      touch = true;
    }
  });
  img.addEventListener('mousedown', () => {
    touch = true;
    setTimeout(() => { touch = false}, 100);
  });
  img.addEventListener('touchend', () => {
    touch = false
  });
});

//* ------------------------------------

  startBtn.classList.add('js_visible'); //*>
startBtn.addEventListener('click', function () {
  cards.forEach(card => {
    card.classList.remove('js_flip');
    card.addEventListener('click', flipCard);
  });
  startBtn.classList.remove('js_visible');
  gameClearMessage.classList.remove('js_visible');
  gameOverMessage.classList.remove('js_visible');
  startBtn.classList.add('active');
  shuffleCards();
  hasFlippedCard = false; 
  lockBoard = false;
  matched = 0;
  unMatched = 0;
  bgmHowl.play();
  startGame = true; //*
});

function flipCard() {
  if(lockBoard) return;            
  if(this === firstCard) return;     
  this.classList.add('js_flip');
  flipCardHowl.play();
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
  setTimeout(() => { matchedHowl.play()}, 300);
  gameClear();
}

function unMatchedCards() {
  lockBoard = true; 
  setTimeout(() => {
    firstCard.classList.remove('js_flip');
    secondCard.classList.remove('js_flip');
    unmatchedHowl.play();
    lockBoard = false;
    firstCard = null;
    unMatched++; 
    gameOverCounter();
  }, 1000);  
}

function gameClear() {
  if(matched === cards.length / 2) {
    setTimeout(() => {
      gameClearMessage.classList.add('js_visible');
      disableCards();
      bgmHowl.stop();
      setTimeout(() => { gameClearHowl.play()}, 800);
      setTimeout(() => {
        startBtn.classList.add('js_visible');
      }, 3000);
    }, 500);
  }
}

function gameOver() {
  gameOverMessage.classList.add('js_visible');
  disableCards();
  bgmHowl.stop();
  gameOverHowl.play();
  setTimeout(() => {
    startBtn.classList.add('js_visible');
  }, 1500);
}

function gameOverCounter() {
  if(unMatched === 10) {  
    gameOver();
  }    
}

function disableCards() {
  cards.forEach(card => {                       
    card.removeEventListener('click', flipCard);
  });
} 

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



//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------























