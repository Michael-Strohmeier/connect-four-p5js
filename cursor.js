class Cursor {
  constructor() {
    this.playerTurn = 1;
    this.radius = 10;
    this.color = color(216, 77, 106);
    this.y = 0;
  }

  setCursorY(y) {
    this.y = y;
  }

  setCursorRadius(r) {
    this.radius = r * 0.25;
  }

  update(n) {
    // n: playerTurn
    this.playerTurn = n;

    if (n == 1) this.color = color(216, 77, 106); // red
    if (n == 2) this.color = color(221, 172, 82); // yellow
  }

  draw() {
    push();
    rectMode(CENTER);
    noStroke();
    fill(this.color);

    rect(mouseX, this.y, this.radius * 2.5, this.radius * 0.5, 10);
    pop();
  }
}
