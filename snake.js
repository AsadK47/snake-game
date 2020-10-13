var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var snake = {xPos: (canvas.width / 2), yPos: (canvas.height / 2), 
  width: 20, height: 20, xMovement: 1, yMovement: 1, colour: "#ffffff"};

var food = {xPos: 200, yPos: 200, width: 6, height: 6, colour: "#ff0000"};

var millisecondRefreshRate = 1;
var direction = {right: false, left: false, down: false, up: false};
var snakeArray = [];
var counter = 1;
var score = 0;

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
  switch (e.keyCode) {
    case 37:
      direction.left = true;
      direction.right = false;
      direction.up = false;
      direction.down = false;
      break;
    case 38:
      direction.up = true;
      direction.right = false;
      direction.left = false;
      direction.down = false;
      break;
    case 39:
      direction.right = true;
      direction.left = false;
      direction.up= false;
      direction.down = false;
      break;
    case 40:
      direction.down = true;
      direction.right = false;
      direction.up= false;
      direction.left = false;
      break;
  }
}

function setCanvas() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

setCanvas();

function drawRectObj(fillStyle, startXPos, startYPos, width, height) {
  ctx.beginPath();
  ctx.fillStyle = fillStyle;
  ctx.fillRect(startXPos, startYPos, width, height);
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRectObj(snake.colour, snake.xPos, snake.yPos, snake.width, snake.height);
  for (i = 0; i < counter; i++) {
    drawRectObj(food.colour, food.xPos, food.yPos, food.width, food.height);
  }
  barrierLogic();
  detectCollision();
  move();
}

function barrierLogic() {
  if (snake.xPos + snake.xMovement > canvas.width + snake.width) {
    snake.xPos = 0 - snake.width;
  } else if (snake.xPos - snake.xMovement < 0 - snake.width) {
    snake.xPos = canvas.width + snake.width;
  }

  if (snake.yPos + snake.yMovement > canvas.height + snake.height) {
    snake.yPos = 0 - snake.height;
  } else if (snake.yPos - snake.yMovement < 0 - snake.height) {
    snake.yPos = canvas.height + snake.height;
  }
}

function move() {
  if (direction.up) {
    snake.yPos += -snake.yMovement; 
  } else if (direction.down) {
    snake.yPos += snake.yMovement;
  } else if (direction.right) {
    snake.xPos += snake.xMovement;
  } else if (direction.left) {
    snake.xPos += -snake.xMovement;
  } else {
    snake.xPos += snake.xMovement;
  }
}

function detectCollision() {
  if (food.xPos < snake.xPos + snake.width 
    && food.xPos + food.width > snake.xPos 
    && food.yPos < snake.yPos + snake.height
    && food.yPos + food.height > snake.yPos) {
      food.xPos = getRandomInt(canvas.width);
      food.yPos = getRandomInt(canvas.height);
      counter++;
      score++;
    }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

setInterval(draw, millisecondRefreshRate);

window.onresize = setCanvas();
window.onresize = draw();
