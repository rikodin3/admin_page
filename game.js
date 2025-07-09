const mazeSize = 5;
const maze = document.getElementById('maze');
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popup-title');
const popupContent = document.getElementById('popup-content');
const popupClose = document.getElementById('popup-close');
const overlay = document.getElementById('overlay');

const playerImg = document.createElement('img');
playerImg.alt = 'Player';
playerImg.style.width = '40px';
playerImg.style.height = '40px';
playerImg.style.objectFit = 'contain';

// Player position starts at top-left (0,0)
let playerPos = {x: 0, y: 0};

// Gifts positions and their data
const gifts = {
  '1,2': {
    type: 'voice',
    title: 'A Voice Note for You 🎤',
    content: `<audio controls>
                <source src="images/birthday.mp3" type="audio/mpeg">
                Your browser does not support the audio element.
              </audio>
              <p>A voice note wishing you a happy birthday.</p>`
  },
  '3,1': {
    type: 'video',
    title: 'A Random Video Surprise 🎥',
    content: `<video controls width="320" height="320">
                <source src="images/random.webm" type="video/webm">
                Your browser does not support the video tag.
              </video>
              <p>Can’t wait to see you soon, here’s a random video of ours!</p>`
  },
  '2,3': {
    type: 'letter',
    title: 'Some Love Words ❤️',
    content: `<p>Meri pyaari baby, you're the best thing that’s happened to me. Being with you, even from this distance , has changed everything. You've brought peace, laughter, comfort joy like i have never felt before and a kind of love I didn’t even know I was capable of feeling.</p>`
  },
  '4,4': {
    type: 'cake',
    title: '🎂 You Found the Cake! 🎂',
    content: `<p>This cake is just the start of all the sweetness we’ll share together.  
              Can’t wait to celebrate with you in person soon!</p>`
  }
};

// Create maze cells
for(let y=0; y<mazeSize; y++) {
  for(let x=0; x<mazeSize; x++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = `cell-${x}-${y}`;
    maze.appendChild(cell);
    console.log("appended");
  }
}


// Draw player
function drawPlayer(direction = 'front') {
  // Remove image from all cells
  for (let y = 0; y < mazeSize; y++) {
    for (let x = 0; x < mazeSize; x++) {
      const cell = document.getElementById(`cell-${x}-${y}`);
      cell.innerHTML = '';  // or only remove playerImg if needed
      cell.classList.remove('player');
    }
  }

  // Update image direction
  switch (direction) {
    case 'up':
      playerImg.src = 'images/up_move.webp';
      break;
    case 'down':
      playerImg.src = 'images/up_move.webp';
      break;
    case 'left':
      playerImg.src = 'images/left_move.webp';
      break;
    case 'right':
    default:
      playerImg.src = 'images/front.webp';
      break;
  }

  const cell = document.getElementById(`cell-${playerPos.x}-${playerPos.y}`);
  cell.appendChild(playerImg);
  cell.classList.add('player');
}
// Show popup with content
function showPopup(title, htmlContent) {
  popupTitle.textContent = title;
  popupContent.innerHTML = htmlContent;
  popup.classList.add('show');
  overlay.classList.add('show');
}

function closePopup() {
  popup.classList.remove('show');
  overlay.classList.remove('show');
}

popupClose.addEventListener('click', closePopup);
overlay.addEventListener('click', closePopup);

// Movement handler
window.addEventListener('keydown', (e) => {
  let moved = false;
  let direction = 'front';

  switch (e.key) {
    case 'ArrowUp':
      if (playerPos.y > 0) {
        playerPos.y--;
        direction = 'up';
        moved = true;
      }
      break;
    case 'ArrowDown':
      if (playerPos.y < mazeSize - 1) {
        playerPos.y++;
        direction = 'down';
        moved = true;
      }
      break;
    case 'ArrowLeft':
      if (playerPos.x > 0) {
        playerPos.x--;
        direction = 'left';
        moved = true;
      }
      break;
    case 'ArrowRight':
      if (playerPos.x < mazeSize - 1) {
        playerPos.x++;
        direction = 'right';
        moved = true;
      }
      break;
  }

  if (moved) {
    drawPlayer(direction);
    checkGift();
  }
});

// Check if current position has a gift
function checkGift() {
  const key = `${playerPos.x},${playerPos.y}`   ;
  if(gifts[key]) {
    showPopup(gifts[key].title, gifts[key].content);

    // If it's the cake, add a special message
    if(gifts[key].type === 'cake') {
      popupContent.innerHTML +=`<p style="margin-top:15px; font-weight:bold; color:#b32450;">Thank you for playing! Happy Birthday again, my love! 🎉❤</p>`;
    }
  }
}

// Initial draw
drawPlayer();