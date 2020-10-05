var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var startX = canvas.width / 2;
var startY = canvas.height - 30;
var xMovement = 1;
var yMovement = 1;
var snakeWidth = 15;
var snakeHeight = 15;
var millisecondRefreshRate = 0.1;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  switch (e.keyCode) {
    case 37:
      xMovement = -1;
      break;
    case 38:
      yMovement = 1;
      break;
    case 39:
      xMovement = 1;
      break;
    case 40:
      yMovement - 1;
      break;
  }
}

function keyUpHandler(e) {
  switch (e.keyCode) {
    case 37:
      xMovement = -1;
      break;
    case 38:
      yMovement = 1;
      break;
    case 39:
      xMovement = 1;
      break;
    case 40:
      yMovement - 1;
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

  if (startX + xMovement > canvas.width + snakeWidth) {
    startX = 0 - snakeWidth;
  } else if (startX - xMovement < 0 - snakeWidth) {
    startX = canvas.width + snakeWidth;
  }

  startX += xMovement;
}

setInterval(draw, millisecondRefreshRate);

window.onresize = this.setCanvas;
window.onresize = this.drawSnake;
