var board;
var turn;
var status;
var spinw, spinx, spiny, spinz;
var isSpun, isPlaced, isTurn, isWin;
var botPickerW;
var botPickerB;
var botMover;
var botOptions = ["Random", "First Move", "Last Move"];

function setup() {
  isPlaced = false;
  isWin = false;
  board = createGrid(6, 6);
  createCanvas(600, 600);
  isSpun = false;
  turn = 1;
  isTurn = createInput("White's turn");
  var p1 = createP("");
  spinw = createButton("Spin top-left_____[W]");
  spinw.mousePressed(spinW);
  spinx = createButton("Spin top-right____[X]");
  spinx.mousePressed(spinX);
  var p2 = createP("");
  spiny = createButton("Spin bottom-left__[Y]");
  spiny.mousePressed(spinY);
  spinz = createButton("Spin bottom-right_[Z]");
  spinz.mousePressed(spinZ);
  var p3 = createP("");
  var p4 = createP("");
  botPickerW = createSelect();
  for(var a = 0; a < botOptions.length; a++) {
    botPickerW.option(botOptions[a]);
  }
  botMover = createButton("Make Bot move");
  botMover.mousePressed(botMove);
  botPickerB = createSelect();
  for(var b = 0; b < botOptions.length; b++) {
    botPickerB.option(botOptions[b]);
  }
  var p6 = createP("");
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

  if(!isPlaced) {
    placeBall(gx, gy, turn);    
  }
}

function placeBall(x, y, t) {
  if (x <= 6 && y <= 6  && x >= 0 && y >= 0 && !isWin) {
    if(board[x][y] == 0) {
      board[x][y] = t;
      var aaa = createSpan(placementToText(x, y));
      //createDOM(placementToText(gx, gy));
      isPlaced = true;
      isSpun = false;

    }
  }
}

function spinGrid(word) {
  if(!isWin) {
    switch(word) {
      case "W":
        rotateGrid(0, 0);
        break;
      case "X":
        rotateGrid(3, 0);
        break;
      case "Y":
        rotateGrid(0, 3);
        break;
      case "Z":
        rotateGrid(3, 3);
        break;
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
    checkForWinner();
  }  
}

function placementToText(x, y) {
  var letters = ['a', 'b', 'c', 'd', 'e', 'f'];

  return str(letters[x] + (y+1));
}

function spinW() {
  spinGrid("W");
}

function spinX() {
  spinGrid("X");
}

function spinY() {
  spinGrid("Y");
}

function spinZ() {
  spinGrid("Z");
}

function isWinner() {
  console.time("winEvaluation");
  var res = 0;

  var countA = 0;
  var countB = 0;
  var occupiedSpots = 0;

  for(var i = 0; i < 6; i++) {
    for(var j = 0; j < 6; j++) {
      var val = board[i][j];

      if(val == 1) {
        countA++;
        countB = 0;
        occupiedSpots++;
      }

      if(val == 2) {
        countB++;
        countA = 0;
        occupiedSpots++;
      }

      if(val == 0) {
        countA = 0;
        countB = 0;
      }
     // console.log(countA);
      //console.log(countB);
      if(countA >= 5) {
        console.timeEnd("winEvaluation");
        return 1;
      } 

      if(countB >= 5) {
        console.timeEnd("winEvaluation");
        return 2;
      }
    }

    countA = 0;
    countB = 0;
  }

  countA = 0;
  countB = 0;

  for(var i = 0; i < 6; i++) {
    for(var j = 0; j < 6; j++) {
      var val = board[j][i];

      if(val == 1) {
        countA++;
        countB = 0;
      }

      if(val == 2) {
        countB++;
        countA = 0;
      }

      if(val == 0) {
        countA = 0;
        countB = 0;
      }
      //console.log(countA);
      //console.log(countB);
      if(countA >= 5) {
        console.timeEnd("winEvaluation");
        return 1;
      } 

      if(countB >= 5) {
        console.timeEnd("winEvaluation");
        return 2;
      }

      countA = 0;
      countB = 0;
    }

    countA = 0;
    countB = 0;
  }

  if(occupiedSpots == 36) {
    console.timeEnd("winEvaluation");
    return -1;
  }

  console.timeEnd("winEvaluation");
  return 0;
}

function checkForWinner() {
  var winner = isWinner();

  if(winner == 1) {
    var space = createP("");
    var win = createA("index.html", "WHITE WINS!");
    console.log("White wins");
    isWin = true;
  }
  if(winner == 2) {
    var space = createP("");
    var win = createA("index.html", "BLACK WINS!");
    console.log("Black wins");
    isWin = true;
  }
  if(winner == -1) {
    var space = createP("");
    var win = createA("index.html", "STALEMATE");
    console.log("stalemate");
    isWin = true;
  }

  //console.log("Nobody wins:(");
}

function botMove() {

  if(turn == 1) {
    console.time("White team Bot: " + botPickerW.value()  +" is thinking..." );
    if(botPickerW.value() == "Random") {
      makeRandomMove();
      
    }
    if(botPickerW.value() == "First Move") {
      makeFirstMove();
    }
    if(botPickerW.value() == "Last Move") {
      makeLastMove();
    }
    console.timeEnd("White team Bot: " + botPickerW.value()  +" is thinking..." );
    return;
  }
  if(turn == 2) {
    console.time("Black team Bot: " + botPickerB.value()  +" is thinking..." );
    if(botPickerB.value() == "Random") {
      makeRandomMove();
      
    }
    if(botPickerB.value() == "First Move") {
      makeFirstMove();
    }
    if(botPickerB.value() == "Last Move") {
      makeLastMove();
    }
    console.timeEnd("Black team Bot: " + botPickerB.value()  +" is thinking..." );
    return;
  }
}

