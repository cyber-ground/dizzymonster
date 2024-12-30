'use strict';



//---------------------------------------------------------------------------------------------------

//                                 ----- DIZZY MONSTER -----
//---------------------------------------------------------------------------------------------------


const startBtn = document.querySelector('.start-btn'); 
const gameClearMessage = document.querySelector('.game-clear');
const gameOverMessage = document.querySelector('.game-over');
const cards = document.querySelectorAll('.memory-card');
  startBtn.classList.add('js_visible');

  if(!startBtn.classList.contains('js_visible')) {
    cards.forEach(card => {
      card.addEventListener('click', flipCard);
    });
  }

  startBtn.addEventListener('click', function () {
    // window.location.reload();
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
    gameStart = false;
    bgmHowl.play();
    gameStart = true;
  });

let hasFlippedCard = false; 
let lockBoard = false;
let firstCard, secondCard;
let matched = 0;
let unMatched = 0;
let gameStart = false;

var bgmHowl = new Howl({src: ['mp3/bgm.mp3'], loop:true, volume: 0.05});
var flipCardHowl = new Howl({src: ['mp3/firstCard.mp3'], volume: 0.5});
var unmatchedHowl = new Howl({src: ['mp3/unmatched.mp3'], volume: 0.5});
var matchedHowl = new Howl({src: ['mp3/matched.mp3'], volume: 0.5});
var gameClearHowl = new Howl({src: ['mp3/gameClear.mp3'], volume: 0.1});
var gameOverHowl = new Howl({src: ['mp3/gameOver.mp3'], volume: 0.1});

function flipCard() {
    if(lockBoard) return;            
    if(this === firstCard) return;     
  this.classList.add('js_flip');
  // if(!gameStart) { bgmHowl.play(); gameStart = true}
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
  setTimeout(() => { matchedHowl.play()}, 500);
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
  }, 1000);  // unflip speed 1500 
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























