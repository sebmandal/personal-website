function main() {
	// initializing the grid
	grid = initGrid();

	writeTilesToDOM(grid);

	// adding one red square (this will be the player)
	grid = placeSquare("red", grid);
	writeTilesToDOM(grid);

	// adding one gold square
	grid = placeSquare("gold", grid);
	writeTilesToDOM(grid);

	// adding ten gray squares
	for (var i = 0; i < 10; i++) {
		grid = placeSquare("gray", grid);
		writeTilesToDOM(grid);
	}
}
