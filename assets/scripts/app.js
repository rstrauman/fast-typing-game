'use strict';

import { backgroundMusic, correctLetterSound, IncorrectWordSoundtrack, letterErrorSound } from './soundtrack.js';
//@ts-ignore
import { Score } from './score.js'; 

let words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy', 'database', 'periodic', 'capitalism', 'abominable', 'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution', 'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music', 'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework', 'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery', 'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow', 'keyboard', 'window'];
let randomWordArray = [];
let nextWordCount = "";
let letterIndex = 0;
let incorrectLetterCount = 0;
let hit = 0; 
let allowOceanLoop = true;

let total = 0;
let correctCountTotal = 0
let incorrectCountTotal = 0;

let nextWord;
let letterBoxes = [];

let score = {
    hits: 0,
    percentage: 0
}

let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
//localStorage.setItem("leaderboard", JSON.stringify(leaderboard))

const oceanAudio = document.getElementById('ocean-sound');

let gameContainer = document.querySelector('.game-container');
let wordContainer = document.querySelector('.current-word-container');
let startBtn = document.querySelector('.start-btn');
let userInput = document.querySelector('.user-input');
let hitCount = document.getElementById('hit-count');

let count = 15;
let timerCount;
let countDisplay = document.querySelector('.countdown')

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
    score = {
        hits: 0,
        percentage: 0
    }

    total = 0; 
    correctCountTotal = 0
    incorrectCountTotal = 0;

    allowOceanLoop = false; 
    oceanAudio.pause();
    oceanAudio.currentTime = 0;
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();

    randomWordArray = [];
    hit = 0; 
    hitCount.innerHTML = hit;

    words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy', 'database', 'periodic', 'capitalism', 'abominable', 'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution', 'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music', 'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework', 'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery', 'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow', 'keyboard', 'window'];

    randomWordArray = sortWords(words);
    wordContainer.innerHTML = "";
    startBtn.remove();

    count = 15;
    countDown();

    document.querySelector('.countdown-container').classList.remove("hidden");

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

    resetBtn.addEventListener('click', () => {
        resetGame();
    });

    userInput.focus();
}

function resetGame(){
    if(nextWord) nextWord.remove();
        clearInterval(timerCount)
        count = 100;
        countDown();

    wordContainer.innerHTML = "";

    const prevResetBtn = document.querySelectorAll('.restart-btn');
    prevResetBtn.forEach(btn => btn.remove());

    letterIndex = 0; 
    incorrectLetterCount = 0; 
    randomWordArray = [];

    clearInterval(timerCount)
    count = 100;

    gameStart();
}

function createNextWord(){
    userInput.value = "";
    wordContainer.innerHTML = "";

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
            correctLetterSound.currentTime = 0; 
            correctLetterSound.play();
            letterBoxes[letterIndex].innerHTML = inputLetter.toUpperCase();
            letterBoxes[letterIndex].classList.remove('incorrect');
            letterBoxes[letterIndex].classList.add('correct');
            letterIndex++;
            correctCountTotal++;
            }
            // Word is correct
            if(letterIndex === nextWordCount.length){
                hit++;
                hitCount.innerHTML = hit;
                randomWordArray.shift();
                if(randomWordArray.length === 0) {
                    allowOceanLoop = true; 
                    backgroundMusic.pause();
                    backgroundMusic.currentTime = 0;
                    oceanAudio.currentTime = 0;
                    play7SecLoop();
                    setTimeout(() => alert("You Win!"), 100);
                }
                setTimeout(createNextWord, 100);
        }
        // Letter is incorrect
        } else {
            // Letter is incorrect 5 or more times
            if(incorrectLetterCount >= 5) {
                IncorrectWordSoundtrack.currentTime = 0; 
                IncorrectWordSoundtrack.play();
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
                letterErrorSound.currentTime = 0; 
                letterErrorSound.play();
                letterBoxes[letterIndex].innerHTML = inputLetter.toUpperCase();
                letterBoxes[letterIndex].classList.add('incorrect');
                letterBoxes[letterIndex].classList.add('anim');
                letterErrorSound.play();
                incorrectLetterCount++;
                incorrectCountTotal++;
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
        if (count === 0 ) return;
        const letter = event.key;
        if(letter === 'Backspace') {
            backSpace();
            return;
        }
        if(!/^[a-z]$/i.test(letter)) return;
        typedLetter(letter);
});
function countDown() {
    timerCount = setInterval(() => {
        count--;
        countDisplay.innerHTML = count;
        console.log(count);
        if (count === 0) {
            total = incorrectCountTotal + correctCountTotal;
            score = {
                hits: hit,
                percentage: ((correctCountTotal / total) * 100)
            }
            leaderboard.unshift(score);
            console.log(leaderboard)
            
            localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

            alert("Game Over!");
            clearInterval(timerCount);
            allowOceanLoop = true; 
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
            oceanAudio.currentTime = 0;
            play7SecLoop();
        }
    }, 1000);

}

// Removes ability to click off screen and be unable to type
document.addEventListener('click', () => {
    userInput.focus();
});

function play7SecLoop() {
    if(!allowOceanLoop) return;
    oceanAudio.currentTime = 0;
    oceanAudio.play().catch(() => {
        console.log("Autoplay blocked, waiting for user interaction");
    });
    setTimeout(() => {
        if(!allowOceanLoop) {
            oceanAudio.pause();
            return;
        }
        play7SecLoop();
    }, 7000);
}

window.addEventListener('load', () => {
    play7SecLoop();
});

