function Snake() {
  var canvas = document.getElementById("gameCanvas");
  var ctx = canvas.getContext("2d");
  var x = canvas.width / 2;
  var y = canvas.height - 30;

  this.setCanvas = function() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  }

  this.createSnake = function() {
    ctx.beginPath();
    ctx.fillStyle = "#FF0000";
    ctx.rect(20, 20, 15, 15);
    ctx.stroke()
    ctx.closePath();
  }

  this.setCanvas();
  this.createSnake();
}

