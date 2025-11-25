'use strict';

let words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy', 'database', 'periodic', 'capitalism', 'abominable', 'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution', 'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music', 'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework', 'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery', 'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow', 'keyboard', 'window'];

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

console.log(sortWords(words));
const oceanAudio = document.getElementById('ocean-sound');

function play7SecLoop() {
    oceanAudio.currentTime = 0;
    oceanAudio.play().catch(() => {
        console.log("Autoplay blocked, waiting for user interaction");
    });
    setTimeout(() => {
        oceanAudio.pause();
        play7SecLoop();
    }, 7000);
}

window.addEventListener('load', () => {
    play7SecLoop();
});

document.body.addEventListener('click', () => {
    oceanAudio.play();
});
