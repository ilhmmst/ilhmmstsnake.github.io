const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highscoreElement = document.querySelector(".high-score");

let snakeX = 5,
  snakeY = 10;
let foodX, foodY;
let velocityX = 0,
  velocityY = 0;
let snakeBody = [];
let gameOver = false;
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highscoreElement.innerText = `High Score : ${score}`;

const changeFoodPosition = () => {
  // disini pengacak makanannya jangan lupa dipanggil di bagian bawah
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};
changeFoodPosition();

const changeDirection = (e) => {
  //   console.log(e); ini fungsinya untuk mengecek keboard arah atas,bawah,kiri,kanan
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};
document.addEventListener("keydown", changeDirection);

// pemanggilan gameover yang sudah dibuat untuk memulai game dari awal
const handleGameOver = () => {
  clearInterval(setIntervalId);
  alert("Game Over");
  location.reload();
};

const initGame = () => {
  // pembuatan bagian makanannya dibuat di js menggunakan htmlmarkup
  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  // kalo uler makan tubuhnya jadi panjang
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]);
    // console.log(snakeBody);

    // penambahan score
    score++;
    scoreElement.innerText = `Score : ${score}`;

    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore)
    highscoreElement.innerText = `High Score : ${highScore}`;

  }

  //   penambahan tubuh uler ketika makan
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY]; // unutuk mengetahui penambahan tubuhnya

  //   pemanggilannya disini untuk si keyboardnya
  snakeX += velocityX;
  snakeY += velocityY;

  //   cek gameover
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }

  if (gameOver) return handleGameOver();

  for (let i = 0; i < snakeBody.length; i++) {
    // pembuatan bagian kepalanya dibuat di js menggunakan htmlmarkup
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }
  playBoard.innerHTML = htmlMarkup;
};
// set interval ini kenya buat penggerak auto dah 125 itu kecepatanya
setIntervalId = setInterval(initGame, 60);
