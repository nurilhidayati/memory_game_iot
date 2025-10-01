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
let maxMatches = 9; // 6 unique cards × 3 copies = 9 pairs

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
      alert('🎉 You Win! 🎉\nCongratulations! You matched all cards in time!');
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
    alert('⏰ You Lose! ⏰\nTime\'s up! Try again to match all cards faster!');
  }
};

// Start the game timer
gameTimer = setInterval(updateTimer, 1000);
