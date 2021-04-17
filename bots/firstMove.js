function makeFirstMove() {
var found = false;

  for(var i = 0; i < 6; i++) {
    for(var j = 0; j < 6; j++) {
      if(board[i][j] == 0 && !found) {
        placeBall(i, j, turn);
        found = true;
      }
    }
  }

  spinGrid("W");
}