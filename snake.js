var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var snake = {xPos: (canvas.width / 2), yPos: (canvas.height / 2), 
  width: 15, height: 15, xMovement: 1, yMovement: 1, colour: "#ffffff"};

var food = {xPos: 200, yPos: 200, width: 6, height: 6, colour: "#ff0000"};

var millisecondRefreshRate = 1;
var directionPressedIs = {right: false, left: false, down: false, up: false};

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
  switch (e.keyCode) {
    case 37:
      directionPressedIs.left = true;
      directionPressedIs.right = false;
      directionPressedIs.up = false;
      directionPressedIs.down = false;
      break;
    case 38:
      directionPressedIs.up = true;
      directionPressedIs.right = false;
      directionPressedIs.left = false;
      directionPressedIs.down = false;
      break;
    case 39:
      directionPressedIs.right = true;
      directionPressedIs.left = false;
      directionPressedIs.up= false;
      directionPressedIs.down = false;
      break;
    case 40:
      directionPressedIs.down = true;
      directionPressedIs.right = false;
      directionPressedIs.up= false;
      directionPressedIs.left = false;
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
  drawRectObj(food.colour, food.xPos, food.yPos, food.width, food.height);
  barrierLogic();
  // detectCollision();
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
  if (directionPressedIs.up) {
    snake.yPos += -snake.yMovement; 
  } else if (directionPressedIs.down) {
    snake.yPos += snake.yMovement;
  } else if (directionPressedIs.right) {
    snake.xPos += snake.xMovement;
  } else if (directionPressedIs.left) {
    snake.xPos += -snake.xMovement;
  } else {
    snake.xPos += snake.xMovement;
  }
}

// function detectCollision() {
//   if ()
// }

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

setInterval(draw, millisecondRefreshRate);

window.onresize = setCanvas();
window.onresize = draw();
