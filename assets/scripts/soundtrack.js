'use strict';

export const backgroundMusic = new Audio('./assets/media/Main_background_music.mp3');
backgroundMusic.type = 'audio/mp3';

export const letterErrorSound = new Audio('./assets/media/Error_sound_for_incorrect_letter.mp3');
letterErrorSound.type = 'audio/mp3';

export const correctLetterSound = new Audio('./assets/media/Correct_sound_for_letter.mp3');
correctLetterSound.type = 'audio/mp3';

export const IncorrectWordSoundtrack = new Audio('./assets/media/incorrect_word.mp3');
IncorrectWordSoundtrack.type = 'audio/wav';

// let startBtn = document.querySelector('.start-btn');

// startBtn.addEventListener("click", () => {
//     backgroundMusic.play();
// });

// document.addEventListener("keydown", function(e) {
//     const letter = e.key.toLowerCase();

//     if (!/^[a-z]$/.test(letter)) return; 

//     if (word.includes(letter)) {
//         correctLetterSound.play();     
//         revealCorrectLetter(letter); 
//     } else {
//         letterErrorSound.play();       
//         handleWrongGuess();
//     }
// });

// // try making a function that counts down, use something like setInterval. Once it reaches 0 then play the soundtrack
 
// // it could be a for loop inside a function that decrements every 1 second