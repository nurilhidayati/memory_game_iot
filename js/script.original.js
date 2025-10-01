const cardsArray = [{
  'name': 'foodlocker',
  'img': 'img/foodlocker.png'
}, {
  'name': 'kartacam1',
  'img': 'img/kartacam1.png'
}, {
  'name': 'kartadashcam2',
  'img': 'img/kartadashcam2.png'
}, {
  'name': 'kartacam360',
  'img': 'img/kartacam360.png'
}, {
  'name': 'kartadashcam1',
  'img': 'img/kartadashcam1.png'
}, {
  'name': 'kartacam2',
  'img': 'img/kartacam2.png'
}];


const gameGrid = cardsArray
  .concat(cardsArray)
  .sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;
let timeLeft = 30;
let gameTimer;
let gameWon = false;
let totalMatches = 0;
let maxMatches = 6; // 6 unique cards × 2 copies = 6 pairs

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(item => {
  const { name, img } = item;

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
  totalMatches++;
  
  // Check if all cards are matched
  if (totalMatches === maxMatches) {
    gameWon = true;
    clearInterval(gameTimer);
    setTimeout(() => {
      showPopup('win', '🎉', 'You Win!', 'Congratulations! You matched all cards in time!');
    }, delay);
  }
};

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', event => {

  const clicked = event.target;

  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }

});

// Timer function
const updateTimer = () => {
  timeLeft--;
  document.getElementById('timer').textContent = timeLeft;
  
  if (timeLeft <= 0 && !gameWon) {
    clearInterval(gameTimer);
    showPopup('lose', '⏰', 'You Lose!', 'Time\'s up! Try again to match all cards faster!');
  }
};

// Start the game timer
gameTimer = setInterval(updateTimer, 1000);

// Popup functions
const showPopup = (type, icon, title, message) => {
  const popup = document.getElementById('popup');
  const popupIcon = document.getElementById('popup-icon');
  const popupTitle = document.getElementById('popup-title');
  const popupMessage = document.getElementById('popup-message');
  
  popup.className = `popup-overlay ${type}`;
  popupIcon.textContent = icon;
  popupTitle.textContent = title;
  popupMessage.textContent = message;
  popup.style.display = 'flex';
};

const hidePopup = () => {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
};

const resetGame = () => {
  // Reset all variables
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;
  timeLeft = 30;
  gameWon = false;
  totalMatches = 0;
  
  // Clear timer
  clearInterval(gameTimer);
  
  // Reset timer display
  document.getElementById('timer').textContent = timeLeft;
  
  // Clear all cards
  const grid = document.querySelector('.grid');
  grid.innerHTML = '';
  
  // Recreate game grid
  const newGameGrid = cardsArray
    .concat(cardsArray)
    .sort(() => 0.5 - Math.random());
  
  newGameGrid.forEach(item => {
    const { name, img } = item;

    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = name;

    const front = document.createElement('div');
    front.classList.add('front');

    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${img})`;

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
  });
  
  // Restart timer
  gameTimer = setInterval(updateTimer, 1000);
  
  // Hide popup
  hidePopup();
};

// Game state management
let gameStarted = false;

// Show home screen
const showHomeScreen = () => {
  document.getElementById('home-screen').style.display = 'flex';
  document.getElementById('game').style.display = 'none';
  gameStarted = false;
};

// Start game
const startGame = () => {
  document.getElementById('home-screen').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  gameStarted = true;
  resetGame();
};

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Home screen button
  const startGameBtn = document.getElementById('start-game-btn');
  startGameBtn.addEventListener('click', startGame);
  
  // Restart button
  const restartBtn = document.getElementById('restart-btn');
  restartBtn.addEventListener('click', resetGame);
  
  // Popup buttons
  const homeBtn = document.getElementById('home-btn');
  const playAgainBtn = document.getElementById('play-again-btn');
  
  homeBtn.addEventListener('click', showHomeScreen);
  playAgainBtn.addEventListener('click', resetGame);
  
  // Show home screen initially
  showHomeScreen();
});
