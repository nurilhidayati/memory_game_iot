'use strict';

var cardsArray = [{
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

var gameGrid = cardsArray.concat(cardsArray).sort(function () {
  return 0.5 - Math.random();
});

var firstGuess = '';
var secondGuess = '';
var count = 0;
var previousTarget = null;
var delay = 1200;
var timeLeft = 30;
var gameTimer;
var gameWon = false;
var totalMatches = 0;
var maxMatches = 6; // 6 unique cards × 2 copies = 6 pairs

var game = document.getElementById('game');
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(function (item) {
  var name = item.name,
      img = item.img;


  var card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  var front = document.createElement('div');
  front.classList.add('front');

  var back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = 'url(' + img + ')';

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

var match = function match() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.add('match');
  });
  totalMatches++;
  
  // Check if all cards are matched
  if (totalMatches === maxMatches) {
    gameWon = true;
    clearInterval(gameTimer);
    setTimeout(function() {
      showPopup('win', '🎉', 'You Win!', 'Congratulations! You matched all cards in time!');
    }, delay);
  }
};

var resetGuesses = function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', function (event) {

  var clicked = event.target;

  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
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
var updateTimer = function updateTimer() {
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
var showPopup = function showPopup(type, icon, title, message) {
  var popup = document.getElementById('popup');
  var popupIcon = document.getElementById('popup-icon');
  var popupTitle = document.getElementById('popup-title');
  var popupMessage = document.getElementById('popup-message');
  
  popup.className = 'popup-overlay ' + type;
  popupIcon.textContent = icon;
  popupTitle.textContent = title;
  popupMessage.textContent = message;
  popup.style.display = 'flex';
};

var hidePopup = function hidePopup() {
  var popup = document.getElementById('popup');
  popup.style.display = 'none';
};

var resetGame = function resetGame() {
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
  var grid = document.querySelector('.grid');
  grid.innerHTML = '';
  
  // Recreate game grid
  var newGameGrid = cardsArray.concat(cardsArray).sort(function () {
    return 0.5 - Math.random();
  });
  
  newGameGrid.forEach(function (item) {
    var name = item.name,
        img = item.img;

    var card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = name;

    var front = document.createElement('div');
    front.classList.add('front');

    var back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = 'url(' + img + ')';

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
var gameStarted = false;

// Show home screen
var showHomeScreen = function showHomeScreen() {
  document.getElementById('home-screen').style.display = 'flex';
  document.getElementById('game').style.display = 'none';
  gameStarted = false;
};

// Start game
var startGame = function startGame() {
  document.getElementById('home-screen').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  gameStarted = true;
  resetGame();
};

// Add event listeners
document.addEventListener('DOMContentLoaded', function () {
  // Home screen button
  var startGameBtn = document.getElementById('start-game-btn');
  startGameBtn.addEventListener('click', startGame);
  
  // Restart button
  var restartBtn = document.getElementById('restart-btn');
  restartBtn.addEventListener('click', resetGame);
  
  // Popup buttons
  var homeBtn = document.getElementById('home-btn');
  var playAgainBtn = document.getElementById('play-again-btn');
  
  homeBtn.addEventListener('click', showHomeScreen);
  playAgainBtn.addEventListener('click', resetGame);
  
  // Show home screen initially
  showHomeScreen();
});
