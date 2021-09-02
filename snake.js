var ctx, snake, direction = "right",
  hisGrowing = 0,
  InitialRunning = 0,
  loopRunFunc,
  speed = 300,
  apple, gameover,
  level = 1;


createCanvas();
createInitialSnake();
drawSnake();

document.addEventListener('keydown', function (e) {
  if (InitialRunning == 0) {
    NewApple()
    run()
    InitialRunning = 1;
  }
});


document.addEventListener('keydown', function (e) {
  var code = e.which || e.keyCode;

  if (InitialRunning == 1) {
    if (code == '38') {
      if (direction == "left" || direction == "right") {
        direction = "up";
      }
    } else if (code == '40') {
      if (direction == "left" || direction == "right") {
        direction = "down";
      }
    } else if (code == '37') {
      if (direction == "up" || direction == "down") {
        direction = "left";
      }
    } else if (code == '39') {
      if (direction == "up" || direction == "down") {
        direction = "right";
      }
    }

  }
});

function createCanvas() {
  ctx = document.getElementById("MyCanvas").getContext("2d");
  ctx.font = "30px Arial";
  ctx.fillText("Press any button to start", 50, 40);
}


function createInitialSnake() {
  snake = [];
  for (let i = 0; i < 3; i++) {
    snake.push({
      left: 187 + 11 * i,
      top: 110
    });
  }
}




function drawSnake() {

  ctx.beginPath();
  ctx.arc(snake[snake.length - 1].left, snake[snake.length - 1].top, 6, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(snake[snake.length - 1].left + 2, snake[snake.length - 1].top, 3, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(snake[snake.length - 1].left + 2, snake[snake.length - 1].top, 1.5, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.fillStyle = "black";

  for (var i = 0; i < snake.length - 1; i++) {

    ctx.beginPath();
    ctx.arc(snake[i].left, snake[i].top, 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "lightgreen";
    ctx.fill();

  }
}

function NewApple() {
  var x = 10, y = 10;

  while (x % 11 != 0) {
    x = Math.floor(Math.random() * 393) + 10
  }
  while (y % 11 != 0) {
    y = Math.floor(Math.random() * 194) + 10
  }

  apple = {
    left: x,
    top: y
  }
}

function drawApple() {
  ctx.font = "10px cursive";
  ctx.fillText("🍎", apple.left - 4, apple.top + 4);
  ctx.fillStyle = "lightgrey";
  document.getElementById("level").innerHTML = "level" + " " + level;
}

function checkGrow() {
  if (apple.left == snake[snake.length - 1].left && apple.top == snake[snake.length - 1].top) {
    level += 1
    hisGrowing = 1
    NewApple();
    speed -= 5;
  }
}


function checkSelfCollision() {
  for (let i = 0; i < snake.length - 2; i++) {
    if (snake[i].left == snake[snake.length - 1].left && snake[i].top == snake[snake.length - 1].top) {
      gameover = 1;
    }
  }
}


function GameOver() { 
  alert("GameOver");
}

function setupInitialGame(){
  ctx.clearRect(0, 0, 407, 209);
  direction = "right";
  ctx.fillStyle = "black";
  createCanvas();
  createInitialSnake();
  drawSnake();
  InitialRunning = 0;
  level = 1;
  speed = 300;
  document.getElementById("level").innerHTML = "level" + " " + 1;
  gameover = 0;
}

function checkBoundary() {
  if (snake[snake.length - 1].left > 396 || snake[snake.length - 1].left < 0 || snake[snake.length - 1].top < 10 || snake[snake.length - 1].top > 198) {
    gameover = 1;
  }
}



function moveRight() {
  if (hisGrowing == 0) {
    snake.shift();
  }
  snake.push({
    left: snake[snake.length - 1].left + 11,
    top: snake[snake.length - 1].top
  });
}

function moveLeft() {
  if (hisGrowing == 0) {
    snake.shift();
  }
  snake.push({
    left: snake[snake.length - 1].left - 11,
    top: snake[snake.length - 1].top
  });
}

function moveUp() {
  if (hisGrowing == 0) {
    snake.shift();
  }
  snake.push({
    left: snake[snake.length - 1].left,
    top: snake[snake.length - 1].top - 11
  });
}

function moveDown() {
  if (hisGrowing == 0) {
    snake.shift();
  }
  snake.push({
    left: snake[snake.length - 1].left,
    top: snake[snake.length - 1].top + 11
  });
}



function run() {
 
  if (direction == "right") {
    moveRight();
  } else if (direction == "left") {
    moveLeft();
  } else if (direction == "up") {
    moveUp();
  } else if (direction == "down") {
    moveDown();
  }

  ctx.clearRect(0, 0, 407, 209);
  hisGrowing = 0;
  drawSnake();
  checkBoundary();
  drawApple();
  checkGrow();
  checkSelfCollision();

  loopRunFunc = setTimeout(run, speed);
  if (gameover == 1) {
    clearTimeout(loopRunFunc);
    GameOver();
    setupInitialGame();
  }
}
