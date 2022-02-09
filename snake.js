// Grabs the canvas from the html document
var canvas = document.getElementById("gameCanvas");
// This method returns a drawing context on the canvas
var context = canvas.getContext("2d");

// Stores snakes head information
// TODO: Style snake within CSS file
var xPosition = canvas.width / 2;
var yPosition = canvas.height / 2;

var snakeHead = {xPos: xPosition, yPos: yPosition, 
  width: 20, height: 20, xMovement: 1, yMovement: 1, colour: "#0BF83B"};

var snakeBody = {xPos: xPosition, yPos: yPosition, 
  width: 10, height: 10, xMovement: 1, yMovement: 1, colour: "#F2F80B"};

// Stores food information
// TODO: Style food within CSS file
var food = {xPos: 200, yPos: 200, width: 6, height: 6, colour: "#ff0000"};

var millisecondRefreshRate = 1;
var direction = {right: false, left: false, down: false, up: false};
var snakeArray = [];
var collisionCount = 1;
var score = 0;

document.addEventListener("keydown", keyHandler, false);

function keyHandler(e) {
  switch (e.keyCode) {
    // Left key
    case 37:
      direction.left = true;
      direction.right = false;
      direction.up = false;
      direction.down = false;
      break;
    // Up key
    case 38:
      direction.up = true;
      direction.right = false;
      direction.left = false;
      direction.down = false;
      break;
    // Right key
    case 39:
      direction.right = true;
      direction.left = false;
      direction.up= false;
      direction.down = false;
      break;
    // Down key
    case 40:
      direction.down = true;
      direction.right = false;
      direction.up= false;
      direction.left = false;
      break;
  }
}

function setCanvas() {
  context.canvas.width = window.innerWidth;
  context.canvas.height = window.innerHeight;
}

setCanvas();

function drawRectObj(fillStyle, startXPos, startYPos, width, height) {
  context.beginPath();
  context.fillStyle = fillStyle;
  context.fillRect(startXPos, startYPos, width, height);
  context.fill();
  context.closePath();
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawRectObj(snakeHead.colour, snakeHead.xPos, snakeHead.yPos, snakeHead.width, snakeHead.height);
  for (i = 0; i < collisionCount; i++) {
    drawRectObj(food.colour, food.xPos, food.yPos, food.width, food.height);
    drawRectObj(snakeBody.colour, (snakeBody.xPos - 20), (snakeBody.yPos), snakeBody.width, snakeBody.height);
  }
  barrierLogic();
  detectCollision();
  move();
}

function barrierLogic() {
  if (snakeHead.xPos + snakeHead.xMovement > canvas.width + snakeHead.width) {
    snakeHead.xPos = 0 - snakeHead.width;
  } else if (snakeHead.xPos - snakeHead.xMovement < 0 - snakeHead.width) {
    snakeHead.xPos = canvas.width + snakeHead.width;
  }

  if (snakeHead.yPos + snakeHead.yMovement > canvas.height + snakeHead.height) {
    snakeHead.yPos = 0 - snakeHead.height;
  } else if (snakeHead.yPos - snakeHead.yMovement < 0 - snakeHead.height) {
    snakeHead.yPos = canvas.height + snakeHead.height;
  }

  if (snakeBody.xPos + snakeBody.xMovement > canvas.width + snakeBody.width) {
    snakeBody.xPos = 0 - snakeBody.width;
  } else if (snakeBody.xPos - snakeBody.xMovement < 0 - snakeBody.width) {
    snakeBody.xPos = canvas.width + snakeBody.width;
  }

  if (snakeBody.yPos + snakeBody.yMovement > canvas.height + snakeBody.height) {
    snakeBody.yPos = 0 - snakeBody.height;
  } else if (snakeBody.yPos - snakeBody.yMovement < 0 - snakeBody.height) {
    snakeBody.yPos = canvas.height + snakeBody.height;
  }
}

function move() {
  if (direction.up) {
    snakeHead.yPos += -snakeHead.yMovement; 
    snakeBody.yPos += -snakeHead.yMovement; 
  } else if (direction.down) {
    snakeHead.yPos += snakeHead.yMovement;
    snakeBody.yPos += snakeHead.yMovement
  } else if (direction.right) {
    snakeHead.xPos += snakeHead.xMovement;
    snakeBody.xPos += snakeHead.xMovement;
  } else if (direction.left) {
    snakeHead.xPos += -snakeHead.xMovement;
    snakeBody.xPos += -snakeHead.xMovement;
  } else {
    snakeHead.xPos += snakeHead.xMovement;
    snakeBody.xPos += snakeHead.xMovement;
  }
}

function detectCollision() {
  if (food.xPos < snakeHead.xPos + snakeHead.width 
    && food.xPos + food.width > snakeHead.xPos 
    && food.yPos < snakeHead.yPos + snakeHead.height
    && food.yPos + food.height > snakeHead.yPos) {
      food.xPos = getRandomInt(canvas.width);
      food.yPos = getRandomInt(canvas.height);
      collisionCount++;
      score++;
      snakeArray.push(snakeHead);
    }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

setInterval(draw, millisecondRefreshRate);

window.onresize = setCanvas();
window.onresize = draw();
