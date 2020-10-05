var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var startX = canvas.width / 2;
var startY = canvas.height / 2;
var xMovement = 1;
var yMovement = 1;
var snakeWidth = 15;
var snakeHeight = 15;
var millisecondRefreshRate = 1;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
  switch (e.keyCode) {
    case 37:
      leftPressed = true;
      rightPressed = false;
      upPressed = false;
      downPressed = false;
      break;
    case 38:
      upPressed = true;
      rightPressed = false;
      leftPressed = false;
      downPressed = false;
      break;
    case 39:
      rightPressed = true;
      leftPressed = false;
      upPressed = false;
      downPressed = false;
      break;
    case 40:
      downPressed = true;
      rightPressed = false;
      upPressed = false;
      leftPressed = false;
      break;
  }
}

function setCanvas() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

setCanvas();

function drawSnake() {
  ctx.beginPath();
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(startX, startY, snakeWidth, snakeHeight);
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  barrierLogic();
  move();
}

function barrierLogic() {
  if (startX + xMovement > canvas.width + snakeWidth) {
    startX = 0 - snakeWidth;
  } else if (startX - xMovement < 0 - snakeWidth) {
    startX = canvas.width + snakeWidth;
  }

  if (startY + yMovement > canvas.height + snakeHeight) {
    startY = 0 - snakeHeight;
  } else if (startY - yMovement < 0 - snakeHeight) {
    startY = canvas.height + snakeHeight;
  }
}

function move() {
  if (upPressed) {
    startY += -yMovement; 
  } else if (downPressed) {
    startY += yMovement;
  } else if (rightPressed) {
    startX += xMovement;
  } else if (leftPressed) {
    startX += -xMovement;
  } else {
    startX += xMovement;
  }
}

setInterval(draw, millisecondRefreshRate);

window.onresize = this.setCanvas;
window.onresize = this.drawSnake;
