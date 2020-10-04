var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var startX = canvas.width / 2;
var startY = canvas.height - 30;
var dx = 2;
var dy = -2;
var snakeWidth = 15;
var snakeHeight = 15;

function setCanvas() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

setCanvas();

function drawSnake() {
  ctx.beginPath();
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(startX, startY, snakeWidth, snakeHeight);
  ctx.fill()
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  startX += dx;
  startY += dy;
}

setInterval(drawSnake, 10);

window.onresize = this.setCanvas;
window.onresize = this.drawSnake;


