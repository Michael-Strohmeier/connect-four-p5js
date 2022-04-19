const Turn = { PLAYER_ONE: 1,
               PLAYER_TWO: 2};

const State = { PLAYING: 0,
                GAME_OVER: 1};

class Game {
  constructor() {
    this.logic = new Logic();

    this.board = new Board();
    this.cursor = new Cursor();

    this.playerTurn = Turn.PLAYER_ONE;
    this.state = State.PLAYING;

    this.winner = 0;

    this.resize();
  }

  resetGame() {
    this.board.reset();
    this.playerTurn = Turn.PLAYER_ONE;
    this.state = State.PLAYING;
    this.cursor.update(this.playerTurn);
    this.winner = 0;
  }

  closestColumn(x) {
    let centers = this.board.getColumnCenters();

    let closestDist = Infinity;
    let index = -1;
    for (let i = 0; i < centers.length; i++) {
      if (abs(centers[i] - x) < closestDist) {
        closestDist = abs(centers[i] - x);
        index = 6 - i;
      }
    }

    return index;
  }

  mousePress(x) {
    if (this.state == State.GAME_OVER) {
      this.resetGame();
      return 0;
    }

    let columnNumber = this.closestColumn(x);

    let tempBoard = this.board.getBoard();
    if (tempBoard[0][columnNumber] == 0) {
      // is legal move
      this.board.dropPiece(columnNumber, this.playerTurn);

      if (this.playerTurn == Turn.PLAYER_ONE) {
        this.playerTurn = Turn.PLAYER_TWO;
      } else {
        this.playerTurn = Turn.PLAYER_ONE;
      }

      this.cursor.update(this.playerTurn);
    }

    // check winner
    let winner = this.logic.checkWinner(this.board.getBoard())
    if (winner != -1) {
      this.state = State.GAME_OVER;
      this.winner = winner;
      return 0;
    }
    return 0;
  }

  resize() {
    this.board.resize();
    this.cursor.setCursorY(this.board.getCursorY());
    this.cursor.setCursorRadius(this.board.getCursorRadius());
  }

  gameOverDraw() {
    let s = "";

    if (this.winner == 1) s = "Player 1 Wins!";
    if (this.winner == 2) s = "Player 2 Wins!";
    if (this.winner == 0) s = "Tie Game!";

    push();
    textAlign(CENTER, CENTER);

    // TODO should probably find a different number to use for textSize... like just take the scale from board and multiply by some default value
    textSize(this.board.getCursorRadius() * 0.6);
    text(s, windowWidth / 2, this.board.getCursorY() * 0.9);
    pop();
  }

  draw() {
    this.board.draw();
    this.cursor.draw();

    if (this.state == State.GAME_OVER) {
      this.gameOverDraw();
    }
  }
}
