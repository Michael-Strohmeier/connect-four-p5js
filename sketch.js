let game;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noCursor();

	game = new Game();
}

function draw() {
	background(240, 235, 220, 255);
	game.draw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
	game.resize();
	// recompute piece centers / board location
}

function mousePressed() {
  game.mousePress(mouseX);
}
