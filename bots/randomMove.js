function makeRandomMove() {
  var availableSquares = [];

  for(var i = 0; i < 6; i++) {
    for(var j = 0; j < 6; j++) {
      if(board[i][j] == 0) {
        var s = {x:i ,y:j};
        availableSquares.push(s);
      }
    }
  }

  var m = floor(random(availableSquares.length));
  placeBall(availableSquares[m].x, availableSquares[m].y, turn);

  m = floor(random(0, 4));

  console.log(m);

  switch(m) {
    case 0:
      spinGrid("W");
      break;
    case 1:
      spinGrid("X");
      break;
    case 2:
      spinGrid("Y");
      break;
    case 3:
      spinGrid("Z");
      break;
  }
}