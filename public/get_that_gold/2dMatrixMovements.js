// movement functions
function moveUp(grid) {
	var playerCol = getPlayerCol(grid);
	var playerRow = getPlayerRow(grid);

	// first we check if the square above the player is a black square, if so we move the player up
	// if the square above the player is a gold square, we add 1 to the player's score and generate a new gold
	// moving up means adding one to the player's y coordinate
	if (grid[playerRow - 1][playerCol] === "black") {
		grid[playerRow - 1][playerCol] = "red";
		grid[playerRow][playerCol] = "black";
	} else if (grid[playerRow - 1][playerCol] === "gold") {
		grid[playerRow - 1][playerCol] = "red";
		grid[playerRow][playerCol] = "black";

		setGold(getGold() + 1);

		grid = placeSquare("gold", grid);
		writeTilesToDOM(grid);
	}

	return grid;
}

function moveDown(grid) {
	var playerCol = getPlayerCol(grid);
	var playerRow = getPlayerRow(grid);

	// first we check if the square below the player is a black square, if so we move the player down
	// if the square below the player is a gold square, we add 1 to the player's score and generate a new gold
	// moving down means adding one to the player's y coordinate
	if (grid[playerRow + 1][playerCol] === "black") {
		grid[playerRow + 1][playerCol] = "red";
		grid[playerRow][playerCol] = "black";
	} else if (grid[playerRow + 1][playerCol] === "gold") {
		grid[playerRow + 1][playerCol] = "red";
		grid[playerRow][playerCol] = "black";

		setGold(getGold() + 1);

		grid = placeSquare("gold", grid);
		writeTilesToDOM(grid);
	}

	return grid;
}

function moveLeft(grid) {
	var playerCol = getPlayerCol(grid);
	var playerRow = getPlayerRow(grid);

	// first we check if the square to the left of the player is a black square, if so we move the player left
	// if the square to the left of the player is a gold square, we add 1 to the player's score and generate a new gold
	// moving left means subtracting one from the player's x coordinate
	if (grid[playerRow][playerCol - 1] === "black") {
		grid[playerRow][playerCol - 1] = "red";
		grid[playerRow][playerCol] = "black";
	} else if (grid[playerRow][playerCol - 1] === "gold") {
		grid[playerRow][playerCol - 1] = "red";
		grid[playerRow][playerCol] = "black";

		setGold(getGold() + 1);

		grid = placeSquare("gold", grid);
		writeTilesToDOM(grid);
	}

	return grid;
}

function moveRight(grid) {
	var playerCol = getPlayerCol(grid);
	var playerRow = getPlayerRow(grid);

	// first we check if the square to the right of the player is a black square, if so we move the player right
	// if the square to the right of the player is a gold square, we add 1 to the player's score and generate a new gold
	// moving right means adding one to the player's x coordinate
	if (grid[playerRow][playerCol + 1] === "black") {
		grid[playerRow][playerCol + 1] = "red";
		grid[playerRow][playerCol] = "black";
	} else if (grid[playerRow][playerCol + 1] === "gold") {
		grid[playerRow][playerCol + 1] = "red";
		grid[playerRow][playerCol] = "black";

		setGold(getGold() + 1);

		grid = placeSquare("gold", grid);
		writeTilesToDOM(grid);
	}

	return grid;
}
