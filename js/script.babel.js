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

// Enhanced shuffling algorithm for harder difficulty
var shuffleArray = function shuffleArray(array) {
  var shuffled = [].concat(array);
  // Multiple shuffle passes for better randomization
  for (var pass = 0; pass < 3; pass++) {
    for (var i = shuffled.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var _ref = [shuffled[j], shuffled[i]];
      shuffled[i] = _ref[0];
      shuffled[j] = _ref[1];
    }
  }
  return shuffled;
};

// Create more challenging grid with additional randomization
var createChallengingGrid = function createChallengingGrid() {
  var duplicated = cardsArray.concat(cardsArray);
  var shuffled = shuffleArray(duplicated);
  
  // Additional randomization by swapping random positions
  for (var i = 0; i < 5; i++) {
    var pos1 = Math.floor(Math.random() * shuffled.length);
    var pos2 = Math.floor(Math.random() * shuffled.length);
    var _ref2 = [shuffled[pos2], shuffled[pos1]];
    shuffled[pos1] = _ref2[0];
    shuffled[pos2] = _ref2[1];
  }
  
  return shuffled;
};

var gameGrid = createChallengingGrid();

var firstGuess = '';
var secondGuess = '';
var count = 0;
var previousTarget = null;
var delay = 800; // Faster card flip back for harder difficulty
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

  // Check if game is stopped or won
  if (gameWon) {
    return;
  }

  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('disabled')) {
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
  
  // Add warning effect to stop button when time is running low
  var stopBtn = document.getElementById('stop-btn');
  if (timeLeft <= 10 && timeLeft > 0 && !gameWon) {
    stopBtn.classList.add('warning');
  } else {
    stopBtn.classList.remove('warning');
  }
  
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
  // Add loading effect to restart button
  var restartBtn = document.getElementById('restart-btn');
  restartBtn.classList.add('loading');
  restartBtn.disabled = true;
  
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
  
  // Recreate game grid with enhanced shuffling
  var newGameGrid = createChallengingGrid();
  
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
  
  // Enable stop button
  var stopBtn = document.getElementById('stop-btn');
  stopBtn.disabled = false;
  stopBtn.textContent = '⏹️ Stop';
  stopBtn.classList.remove('warning');
  
  // Re-enable all cards
  var cards = document.querySelectorAll('.card');
  cards.forEach(function (card) {
    card.classList.remove('disabled');
    card.style.pointerEvents = 'auto';
    card.style.opacity = '1';
  });
  
  // Remove loading effect and re-enable restart button
  setTimeout(function () {
    restartBtn.classList.remove('loading');
    restartBtn.disabled = false;
  }, 1000);
  
  // Hide popup
  hidePopup();
};

// Stop game function
var stopGame = function stopGame() {
  // Clear timer completely
  if (gameTimer) {
    clearInterval(gameTimer);
    gameTimer = null;
  }
  
  // Reset all game variables
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;
  gameWon = true; // Set to true to prevent further card interactions
  totalMatches = 0;
  
  // Reset timer display to show current time
  document.getElementById('timer').textContent = timeLeft;
  
  // Disable stop button
  var stopBtn = document.getElementById('stop-btn');
  stopBtn.disabled = true;
  stopBtn.textContent = '⏹️ Stopped';
  
  // Disable all cards by adding a disabled class
  var cards = document.querySelectorAll('.card');
  cards.forEach(function (card) {
    card.classList.add('disabled');
    card.style.pointerEvents = 'none';
    card.style.opacity = '0.6';
  });
  
  // Show stop popup
  showPopup('stop', '⏹️', 'Game Stopped', 'You stopped the game. Click Play Again to restart!');
};

// Add event listeners
document.addEventListener('DOMContentLoaded', function () {
  // Restart button
  var restartBtn = document.getElementById('restart-btn');
  restartBtn.addEventListener('click', resetGame);
  
  // Stop button
  var stopBtn = document.getElementById('stop-btn');
  stopBtn.addEventListener('click', stopGame);
  
  // Popup button
  var playAgainBtn = document.getElementById('play-again-btn');
  playAgainBtn.addEventListener('click', resetGame);
});
