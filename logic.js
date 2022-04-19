/*
didn't feel like coding this. did it in Python for a class so I just copied from
https://stackoverflow.com/questions/33181356/connect-four-game-checking-for-wins-js
*/

class Logic {
  /*
  return -1 for not a tie
  return bd[r][c] for winner
  return 0 for tie
  */

  checkLine(a, b, c, d) {
    // Check first cell non-zero and all cells match
    return ((a != 0) && (a == b) && (a == c) && (a == d));
  }

  checkWinner(bd) {
    // Check down
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 7; c++)
        if (this.checkLine(bd[r][c], bd[r+1][c], bd[r+2][c], bd[r+3][c]))
          return bd[r][c];

    // Check right
    for (let r = 0; r < 6; r++)
      for (let c = 0; c < 4; c++)
        if (this.checkLine(bd[r][c], bd[r][c+1], bd[r][c+2], bd[r][c+3]))
          return bd[r][c];

    // Check down-right
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 4; c++)
        if (this.checkLine(bd[r][c], bd[r+1][c+1], bd[r+2][c+2], bd[r+3][c+3]))
          return bd[r][c];

    // Check down-left
    for (let r = 3; r < 6; r++)
      for (let c = 0; c < 4; c++)
        if (this.checkLine(bd[r][c], bd[r-1][c+1], bd[r-2][c+2], bd[r-3][c+3]))
          return bd[r][c];

    // check if not a tie
    for (let i = 0; i < 7; i++) {
      if (bd[0][i] == 0) {
        return -1
      }
    }

    return 0;
  }
}
