function makeLastMove() {
  var found = false;
  
    for(var i = 5; i >= 0; i--) {
      for(var j = 5; j >= 0; j--) {
        if(board[i][j] == 0 && !found) {
          placeBall(i, j, turn);
          found = true;
        }
      }
    }
  
    spinGrid("Z");
  }