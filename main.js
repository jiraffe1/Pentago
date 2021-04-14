var board;
var turn;
var status;
var spinw;
var spinx;
var spiny;
var spinz;
var isSpun ;
var isPlaced;
var isTurn;

function setup() {
  isPlaced = false;
  board = createGrid(6, 6);
  createCanvas(600, 600);
  isSpun = false;
  turn = 1;
  isTurn = createInput("White's turn");
  var placeholer = createP("");
  spinw = createButton("Spin top-left");
  spinw.mousePressed(spinW);
  spinx = createButton("Spin top-right");
  spinx.mousePressed(spinX);
  var plahooler = createP("");
  spiny = createButton("Spin bottom-left");
  spiny.mousePressed(spinY);
  spinz = createButton("Spin bottom-right");
  spinz.mousePressed(spinZ);
  var placeholder = createP("");
  status = createP("Moves: ");
}

function draw() {
  background(220);

  push();
  fill(80);
  stroke(0, 0, 0);
  strokeWeight(4);
  rect(15, 15, width / 2 - 30, height / 2 - 30);
  rect(15, height / 2 + 15, width / 2 - 30, height / 2 - 30);
  rect(width / 2 + 15, 15, width / 2 - 30, height / 2 - 30);
  rect(width / 2 + 15, height / 2 + 15, width / 2 - 30, height / 2 - 30)
  pop();
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      var x = width / 6 * i + width / 12;
      var y = height / 6 * j + height / 12;

      switch (board[i][j]) {
        case 0:
          push();
          ellipseMode(CENTER);
          fill(127, 127, 127);
          strokeWeight(4);
          //noStroke();
          ellipse(x, y, width / 6 - 30, height / 6 - 30);
          pop();
          break;
        case 1:
          push();
          ellipseMode(CENTER);
          fill(255, 255, 255);
          strokeWeight(4);
          //noStroke();
          ellipse(x, y, width / 6 - 30, height / 6 - 30);
          pop();
          break;
        case 2:
          push();
          strokeWeight(4);
          ellipseMode(CENTER);
          fill(0, 0, 0);
          //noStroke();
          ellipse(x, y, width / 6 - 30, height / 6 - 30);
          pop();
          break;
      }

    }
  }
}

function createGrid(a, b) {
  var res = [];
  for (var i = 0; i < a; i++) {
    res.push(new Array(b));
  }
  for (var j = 0; j < a; j++) {
    for (var k = 0; k < b; k++) {
      res[j][k] = 0;
    }
  }
  return res;
}

function mousePressed() {
  var gx = floor(mouseX / (width / 6));
  var gy = floor(mouseY / (width / 6));

  if(board[gx][gy] == 0 && !isPlaced) {
    if (gx <= 6 && gy <= 6) {
      board[gx][gy] = turn;
      //console.log(placementToText(gx, gy));
      var aaa = createSpan(placementToText(gx, gy));
      //createDOM(placementToText(gx, gy));
      isPlaced = true;
      isSpun = false;
    }
  }
}

function rotateGrid(ox, oy) {
  if(isPlaced) {
    var newGrid = createGrid(6, 6);

    for(var i = 0; i < 6; i++) {
      for(var j = 0; j < 6; j++) {
        newGrid[i][j] = board[i][j];
      }
    }

    newGrid[ox][oy] = board[ox][oy+2];
    newGrid[ox+1][oy] = board[ox][oy+1];
    newGrid[ox+2][oy] = board[ox][oy];
    
    newGrid[ox][oy+1] = board[ox+1][oy+2];
    newGrid[ox][oy+2] = board[ox+2][oy+2];
    
    newGrid[ox+1][oy+2] = board[ox+2][oy+1];
    newGrid[ox+2][oy+1] = board[ox+1][oy];
    newGrid[ox+2][oy+2] = board[ox+2][oy];
    board = newGrid;

    if(turn == 1) {
      turn = 2;
      isTurn.value("Black's turn");
    }
    else {
      turn = 1;
      isTurn.value("White's turn");
    }
    isPlaced = false;
    //isSpun = true;

    if(ox == 0 && oy == 0) {
      var ss = createSpan("W, ");
    }
    if(ox == 3 && oy == 0) {
      var ss = createSpan("X, ");
    }
    if(ox == 0 && oy == 3) {
      var ss = createSpan("Y, ");
    }
    if(ox == 3 && oy == 3) {
      var ss = createSpan("Z, ");
    }
  }  


}

function placementToText(x, y) {
  var letters = ['a', 'b', 'c', 'd', 'e', 'f'];

  return str(letters[x] + (y+1));
}

function spinW() {
  rotateGrid(0, 0);
}

function spinX() {
  rotateGrid(3, 0);
}

function spinY() {
  rotateGrid(0, 3);
}

function spinZ() {
  rotateGrid(3, 3);
}

function isWinner() {
  var res = 0;

  var countA = 0;
  var countB = 0;

  for(var i = 0; i < 6; i++) {
    for(var j = 0; j < 6; j++) {
      var val = board[i][j];

      if(val == 1) {
        countA++;
      }

      if(val == 2) {
        countB++;
      }

      if(val == 0) {
        countA = 0;
        countB = 0;
      }
    }
  }

  return res;
}