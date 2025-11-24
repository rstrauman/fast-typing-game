'use strict';

const backgroundMusic = new Audio('./assets/media/Main_background_music.mp3');
backgroundMusic.type = 'audio/mp3';

const letterErrorSound = new Audio('./assets/media/Error_sound_for_incorrect_letter.mp3');
letterErrorSound.type = 'audio/mp3';

const correctLetterSound = new Audio('./assets/media/Correct_sound_for_letter.mp3');
correctLetterSound.type = 'audio/mp3'

const IncorrectWordSoundtrack = new Audio('./assets/media/Incorrect_word_soundtrack.wav');
IncorrectWordSoundtrack.type = 'audio/wav'


// query selectors
const start = document.querySelector('!DOCTYPE html');
// const jumpBtn = document.querySelector('.jump');
// const mario = document.querySelector('.mario');

// window.addEventListener('load', function() {
//     backgroundMusic.play();
// })

document.addEventListener("DOMContentLoaded", function () {
    backgroundMusic.play();

});
// start.addEventListener('click', () => {
//     start.play();
// })

// jumpBtn.addEventListener('click', () => {
//     // start.pause();
//     jump.play();
//     mario.classList.add('anim');
//     setTimeOut(() => {
//         mario.classList.remove('anim')
//     }, 800)
// })