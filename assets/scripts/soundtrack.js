'use strict';

export const backgroundMusic = new Audio('./assets/media/Main_background_music.mp3');
backgroundMusic.type = 'audio/mp3';

export const letterErrorSound = new Audio('./assets/media/Error_sound_for_incorrect_letter.mp3');
letterErrorSound.type = 'audio/mp3';

export const correctLetterSound = new Audio('./assets/media/Correct_sound_for_letter.mp3');
correctLetterSound.type = 'audio/mp3';

export const IncorrectWordSoundtrack = new Audio('./assets/media/incorrect_word.mp3');
IncorrectWordSoundtrack.type = 'audio/wav';
