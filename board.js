
class Board {
  constructor(r) {
    this.board = null;
    this.reset();

    this.centX = windowWidth / 2;
    this.centY = windowHeight / 2;

    this.boardWidth = 1;
    this.boardHeight = 1;
    this.scale = 1;

    this.pieceRadius = 1;
    this.pieceSeparation = this.pieceRadius * 1.1;

    this.columnCenters = null;
    this.rowCenters = null;

    this.resize();
  }

  reset() {
    this.board = [[0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0]];
  }

  resize() {
    // ratio of the screen width and height (didn't want board to take up full screen)
    let maxWidth = windowWidth * 0.65;
    let maxHeight = windowHeight * 0.65;

    /*
    maintain aspect ratio and resize -> stored in this.scale variable

    (7 * 100) is default width of board. There are 7 columns -> columns ~= width
    (6 * 100) is default height -> 6 rows ~= height
    */
    this.scale = Math.min(maxWidth / (7 * 100), maxHeight / (6 * 100));
    this.boardWidth = (7 * 100) * this.scale;
    this.boardHeight = (6 * 100) * this.scale;

    // change center (centX, centY)
    this.centX = windowWidth / 2;
    this.centY = windowHeight / 2;

    /*
    radius of each piece. radius of 100 on default board is too big
    as with 7 pieces, there would be no space in a row separating pieces.
    (100 * .85) should be enough of a scale down of the pieces, then
    scale this number down with the rest of the board
    */
    this.pieceRadius = (100 * 0.87) * this.scale;

    // column centers is used for deciding which row user is dropping a piece
    this.columnCenters = this.getColumnCenters();
    this.rowCenters = this.getColumnCenters();
  }

  // getCursorY and getCursorRadius are here because size of cursor is dependant on board size
  getCursorY() {
    return this.centY - 6 * this.pieceRadius * this.pieceSeparation + 2.55 * this.pieceRadius * this.pieceSeparation;
  }

  getCursorRadius() {
    return this.pieceRadius * 1;
  }

  getColumnCenters() {
    // used to determine the closest value to the mouse press (for dropping pieces into column)
    let centers = [];
    for (let j = 0; j < this.board[0].length; j++) {
      let x = this.centX - j * this.pieceRadius * this.pieceSeparation + 3 * this.pieceRadius * this.pieceSeparation;
      centers.push(x);
    }
    return centers;
  }

  getRowCenters() {
    // dead code for right now. it broke the drawing need to look at this
    let centers = [];
    for (let i = 0; j < this.board.length; i++) {
      let y = this.centY - i * this.pieceRadius * this.pieceSeparation + 2.55 * this.pieceRadius * this.pieceSeparation;
      centers.push(y);
    }
    return centers;
  }

  getBoard() {
    return this.board;
  }

  dropPiece(columnNumber, n) {
    /*
    columnNumber: column we are dropping piece into
    n: player number
    */
    let dropRow = -1;
    for (let i = 0; i < 6; i++) {
      // TODO: I think that we aren't checking bottom row first. If that is the case should change
      if (this.board[i][columnNumber] == 0) {
        dropRow = i;
      }
    }

    this.board[dropRow][columnNumber] = n;
  }

  drawSinglePiece(x, y, i) {
    let c = color(0, 0, 0);
    if (i == 0) c = color(253, 247, 232, 255); // tan color
    if (i == 1) c = color(216, 77, 106); // red
    if (i == 2) c = color(221, 172, 82); // yellow
    // color(216, 77, 106)
    push();
    ellipseMode(CENTER);
    noStroke();
    fill(c);

    ellipse(x, y, this.pieceRadius);
    pop();
  }

  drawPieces() {
    for (let i = 0; i < this.board.length; i++) {
      let y = this.centY - i * this.pieceRadius * this.pieceSeparation + 2.55 * this.pieceRadius * this.pieceSeparation;

      for (let j = 0; j < this.board[i].length; j++) {
        let x = this.columnCenters[j];
        this.drawSinglePiece(x, y, this.board[5 - i][6 - j])
      }
    }
  }

  drawBoard() {
    // drawing the blue board (it's just a rect with rounded corners)
    push();
    rectMode(CENTER);
    noStroke();
    fill(63, 145, 241, 240); // blue

    rect(this.centX, this.centY, this.boardWidth, this.boardHeight, 10);
    pop();
  }

  draw() {
    this.drawBoard();
    this.drawPieces();
  }
}
