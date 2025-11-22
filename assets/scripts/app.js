'use strict';

let words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy', 'database', 'periodic', 'capitalism', 'abominable', 'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution', 'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music', 'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework', 'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery', 'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow', 'keyboard', 'window'];
let randomWordArray = [];
let nextWordCount = "";

// let userInput; // eventually will 
let nextWord;
let wordInputSpace;

let gameContainer = document.querySelector('.game-container');
let wordContainer = document.querySelector('.current-word-container');
let startBtn = document.querySelector('.start-btn');
let userInput = document.querySelector('.user-input');


function sortWords(shuffleWords) {
    let currentIndex = shuffleWords.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = shuffleWords[currentIndex];
    shuffleWords[currentIndex] = shuffleWords[randomIndex];
    shuffleWords[randomIndex] = temporaryValue;
  }

  return shuffleWords;
}

function gameStart(){
    randomWordArray = sortWords(words);

    wordContainer.innerHTML = "";
    startBtn.remove();

    nextWord = document.createElement('div');
    nextWord.innerHTML = randomWordArray[0].toUpperCase();
    nextWord.classList.add('next-word');
    gameContainer.appendChild(nextWord);

    nextWordCount = randomWordArray[0];

    gameContainer.appendChild(wordContainer);
    for(let i = 0; i < nextWordCount.length; i++){
        let emptyLetterBox = document.createElement('div');
        emptyLetterBox.classList = ('letter-box');
        wordContainer.appendChild(emptyLetterBox);
    }

    let resetBtn = document.createElement('div');
    resetBtn.innerHTML = 'Restart';
    resetBtn.classList.add('restart-btn');
    gameContainer.appendChild(resetBtn);

    userInput.focus();

}

function createNextWord(){
    for(let i = 0; i < randomWordArray.length; i++){
        nextWord = document.createElement('div');
        nextWord.innerHTML = randomWordArray[i];
        gameContainer.appendChild(nextWord);
    }
}

// createNextWord();

startBtn.addEventListener('click', gameStart);