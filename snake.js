var ctx, snake, direction = "right",
  hisGrowing = 0,
  counter = 0,
  inter,
  speed = 300,
  LastDirection = "right",
  apple, gameover,
  score = 1;
  



createCanvas();
createInitialSnake();
drawSnake();

//כדי שירוץ רק בהתחלה
document.addEventListener('keydown', function(e) {
  if (counter == 0) {
    Apples()
    run()
    counter = 1;
  }
});


document.addEventListener('keydown', function(e) {
  var code = e.which || e.keyCode;

  if (counter == 1) {
    if (code == '38') {
      // Up
      if (direction == "left" || direction == "right") {
        direction = "up";
        //run();
      }
    } else if (code == '40') {
      // Down
      if (direction == "left" || direction == "right") {
        direction = "down";
        //run();
      }
    } else if (code == '37') {
      // Left
      if (direction == "start" || direction == "up" || direction == "down") {
        direction = "left";
        //  run();
      }
    } else if (code == '39') {
      // Right
      if (direction == "start" || direction == "up" || direction == "down") {
        direction = "right";
        //run();
      }
    }

  }
});

function createCanvas() {
  var c = document.getElementById("MyCanvas");
  ctx = c.getContext("2d");
  ctx.font = "30px Arial";
  ctx.fillText("Press any button to start", 50, 40);
  // ctx.fillStyle = "lightgrey";
}


function createInitialSnake() {
  snake = [];
  for (i = 0; i < 3; i++) {
    snake.push({
      left: 187 + 11 * i,
      top: 110
    });
  }
}


function drawSnake() {
  ctx.fillStyle = "black";
  for (var segment of snake) {
    if (segment.left == snake[snake.length-1].left && segment.top == snake[snake.length-1].top){
      console.log(segment);

      ctx.beginPath();
      //ctx.arc(100, 75, 50, 0, 2 * Math.PI);
      ctx.arc(segment.left, segment.top, 6, 0,2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = "black";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(segment.left+2, segment.top, 3, 0,2 * Math.PI);  
      ctx.fillStyle = "white";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(segment.left+2, segment.top, 1.5, 0,2 * Math.PI);  
      ctx.fillStyle = "red";
      ctx.fill();

          //ctx.fillRect(segment.left, segment.top, segment.width, segment.height);
    }else{

      ctx.beginPath();
      //ctx.arc(100, 75, 50, 0, 2 * Math.PI);
      ctx.arc(segment.left, segment.top, 5, 0,2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = "lightgreen";
      ctx.fill();
          //ctx.fillRect(segment.left, segment.top, segment.width, segment.height);

    }
   
  }
}


function Apples() {

  var x = 10,
    y = 10;

  while (x % 11 != 0) {
    x = Math.floor(Math.random() * 393) +10
  }

  while (y % 11 != 0) {
    y = Math.floor(Math.random() * 194) +10
  }

  apple = {
    left: x,
    top: y
  }
}

function drawApple() {
  ctx.font = "10px cursive";
  ctx.fillText("🍎", apple.left-4 , apple.top +4 );
  ctx.fillStyle = "lightgrey";
  document.getElementById("score").innerHTML = "level" +" " + score;
  
  //ctx.fillRect(apple.left, apple.top, 10, 10);
}

function grow() {
  if (apple.left == snake[snake.length - 1].left && apple.top == snake[snake.length - 1].top) {
    score += 1
    hisGrowing = 1
    Apples();
    //clearTimeout(inter);
    speed -= 5;

  }
}


function CheckCollision() {
  for (var i = 0; i < snake.length - 2; i++) {
    if (snake[i].left == snake[snake.length - 1].left && snake[i].top == snake[snake.length - 1].top) {
      gameover = 1;
    }
  }
}


function GameOver() { 
  ctx.clearRect(0, 0, 407, 209);
  alert("oops");
  direction = "right"; 
  ctx.fillStyle = "black";
  createCanvas();
  createInitialSnake();
  drawSnake();
  counter = 0;
  score = 1;
  speed = 300;
  document.getElementById("score").innerHTML = "level" +" " + 1;
 // gameover = 1;
}

function BoundaryCheck() {
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
  
  clearTimeout(inter)

  
  if (direction == "right") {
    moveRight();   
  } else if (direction == "left") {
    moveLeft(); 
  } else if (direction == "up") {
    moveUp();  
  } else if (direction == "down") {
    moveDown();
  }
  if (direction != "start") {
    ctx.clearRect(0, 0, 407, 209);
  }
  

  hisGrowing = 0;
  drawSnake();
  BoundaryCheck();
  drawApple();
  grow();
  CheckCollision();
  
  inter = setTimeout(run, speed);
  if(gameover == 1){
  clearTimeout(inter);
  GameOver();
  gameover = 0;
  console.log(counter)
  }
}

