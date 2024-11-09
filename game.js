const gameArea = document.getElementById("game");
const basket = document.getElementById("basket");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");

let score = 0;
let lives = 3;
let basketPosition = 160;
let objectFallSpeed = 3;
let objectInterval;

// Move basket with arrow keys
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && basketPosition > 0) {
    basketPosition -= 20;
  } else if (event.key === "ArrowRight" && basketPosition < 320) {
    basketPosition += 20;
  }
  basket.style.left = basketPosition + "px";
});

// Create falling objects
function createFallingObject() {
  const object = document.createElement("div");
  object.classList.add("object");
  object.style.left = Math.floor(Math.random() * 370) + "px";
  object.style.top = "0px";
  gameArea.appendChild(object);

  let fallInterval = setInterval(() => {
    let objectTop = parseInt(object.style.top);
    object.style.top = objectTop + objectFallSpeed + "px";

    // Check if object hits the basket
    const objectLeft = parseInt(object.style.left);
    if (
      objectTop > 560 &&
      objectTop < 600 &&
      objectLeft > basketPosition - 30 &&
      objectLeft < basketPosition + 80
    ) {
      score++;
      scoreDisplay.textContent = score;
      gameArea.removeChild(object);
      clearInterval(fallInterval);
    }

    // Check if object falls past the basket
    if (objectTop >= 600) {
      lives--;
      livesDisplay.textContent = lives;
      gameArea.removeChild(object);
      clearInterval(fallInterval);

      if (lives <= 0) {
        clearInterval(objectInterval);
        alert("Game Over! Your final score is " + score);
        resetGame();
      }
    }
  }, 20);
}

// Start game with falling objects every second
function startGame() {
  objectInterval = setInterval(createFallingObject, 1000);
}

// Reset game after game over
function resetGame() {
  score = 0;
  lives = 3;
  scoreDisplay.textContent = score;
  livesDisplay.textContent = lives;
  basketPosition = 160;
  basket.style.left = basketPosition + "px";
  startGame();
}

// Start the game initially
startGame();
