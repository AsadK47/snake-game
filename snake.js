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
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(20, 20, 15, 15);
    ctx.stroke()
    ctx.closePath();
  }

  window.onresize = this.setCanvas;
  window.onresize = this.createSnake;

  this.setCanvas();
  this.createSnake();
}

