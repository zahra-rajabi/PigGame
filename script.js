'use strict';
// ???????????????? elements
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

score0El.textContent = 0;
score1El.textContent = 0;
let currentScore = 0;
let playerScore = 0;
diceEl.classList.add('hidden');
let isPlaying = !false;
let scores = [0, 0];
///////////////////// //////////////////////////////////////////
let activePlayer = 0;

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
};
///////////////////////////////////////////////////////////////
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    const dice = Math.trunc(Math.random() * 6 + 1);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;

    if (scores[activePlayer] >= 30) {
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document.getElementById(`name--${activePlayer}`).textContent =
        'W I N N E R 🥇';
      diceEl.classList.add('hidden');
    }
    switchPlayer();
  }
});
btnNew.addEventListener('click', function () {
  isPlaying = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;

  switchPlayer();
  document.getElementById(`name--${activePlayer}`).textContent = `player ${
    activePlayer + 1
  }`;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  activePlayer = 0;
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  scores = [0, 0];
  diceEl.classList.add('hidden');
});
