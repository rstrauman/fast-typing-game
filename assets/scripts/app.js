'use strict';

let words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy', 'database', 'periodic', 'capitalism', 'abominable', 'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution', 'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music', 'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework', 'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery', 'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow', 'keyboard', 'window'];
let randomWordArray = [];
let nextWordCount = "";
let letterIndex = 0;
let incorrectLetterCount = 0;
let tooManyIncorrect = false;

let nextWord;
let wordInputSpace;
let letterBoxes = [];

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

    letterBoxes = wordContainer.querySelectorAll('.letter-box');
    letterIndex = 0;

    let resetBtn = document.createElement('div');
    resetBtn.innerHTML = 'Restart';
    resetBtn.classList.add('restart-btn');
    gameContainer.appendChild(resetBtn);

    resetBtn.addEventListener('click', resetGame);

    userInput.focus();
}

function resetGame(){
    if(nextWord) nextWord.remove();

    wordContainer.innerHTML = "";

    const prevResetBtn = document.querySelectorAll('.restart-btn');
    prevResetBtn.forEach(btn => btn.remove());

    letterIndex = 0; 
    incorrectLetterCount = 0; 
    randomWordArray = [];

    gameStart();
}

function createNextWord(){
    userInput.value = "";
    wordContainer.innerHTML = "";
    randomWordArray.shift();

    nextWordCount = randomWordArray[0];
    nextWord.innerHTML = randomWordArray[0].toUpperCase();

    for(let i = 0; i < nextWordCount.length; i++){
        let emptyLetterBox = document.createElement('div');
        emptyLetterBox.classList = ('letter-box');
        wordContainer.appendChild(emptyLetterBox);
    }

    letterBoxes = wordContainer.querySelectorAll('.letter-box');
    letterIndex = 0;
}

function typedLetter(inputLetter){
    if(letterIndex >= nextWordCount.length) return;
    inputLetter = inputLetter.toLowerCase();

    if(inputLetter === nextWordCount[letterIndex].toLowerCase()) {
        // User inputs correct letter BUT letter is already incorrect (has to backspace first)
        if(letterBoxes[letterIndex].classList.contains('incorrect')) return;
        // Letter is correct
        else {
            letterBoxes[letterIndex].innerHTML = inputLetter.toUpperCase();
            letterBoxes[letterIndex].classList.remove('incorrect');
            letterBoxes[letterIndex].classList.add('correct');
            letterIndex++;
            }
            // Word is correct
            if(letterIndex === nextWordCount.length){
                setTimeout(createNextWord, 100);
        }
        // Letter is incorrect
        } else {
            // Letter is incorrect 5 or more times
            if(incorrectLetterCount >= 5) {
                for(let box of letterBoxes){
                    box.classList.add('anim');
                }
                setTimeout(() => {
                    for(let box of letterBoxes){
                        box.classList.remove('anim');
                    }
                }, 500);
                return;
                // Letter is incorrect 
            } else {
                letterBoxes[letterIndex].innerHTML = inputLetter.toUpperCase();
                letterBoxes[letterIndex].classList.add('incorrect');
                letterBoxes[letterIndex].classList.add('anim');
                letterErrorSound.play();
                incorrectLetterCount++;
                setTimeout(() => {
                    letterBoxes[letterIndex].classList.remove('anim');
                }, 500)
        }
    }
}

function backSpace(){
    if(letterIndex === 0 && !letterBoxes[0].classList.contains('incorrect')) return;
    
    // Backspace an incorrect letter
    if(letterBoxes[letterIndex].classList.contains('incorrect')){
        letterBoxes[letterIndex].innerHTML = "";
        letterBoxes[letterIndex].classList.remove('incorrect');
        incorrectLetterCount = 0;
        return;
    }
    // Backspace a correct letter
    letterIndex--;
    letterBoxes[letterIndex].innerHTML = "";
    letterBoxes[letterIndex].classList.remove('correct', 'incorrect');
}

startBtn.addEventListener('click', gameStart);
userInput.addEventListener('keydown', (event) => {
        const letter = event.key;
        if(letter === 'Backspace') {
            backSpace();
            return;
        }
        if(!/^[a-z]$/i.test(letter)) return;
        typedLetter(letter);
    });

// Removes ability to click off screen and be unable to type
document.addEventListener('click', () => {
    userInput.focus();
});