// initializing the grid
function initGrid() {
	var grid = [];
	for (var i = 0; i < 10; i++) {
		grid[i] = [];
		for (var j = 0; j < 10; j++) {
			grid[i][j] = "black";
		}
	}
	return grid;
}

// changing a random square to a given color
function placeSquare(color, grid) {
	// placing a square of the given color at a random position in the tiles, as long as the tile being replaced is "b"

	var randomX = Math.floor(Math.random() * 10);
	var randomY = Math.floor(Math.random() * 10);

	// ensuring there's at least one black square to replace

	while (grid[randomX][randomY] !== "black") {
		randomX = Math.floor(Math.random() * 10);
		randomY = Math.floor(Math.random() * 10);
	}

	grid[randomX][randomY] = color;

	return grid;
}

// create the DOM elements
function writeTilesToDOM(grid) {
	var content = document.querySelector(".content");
	content.innerHTML = "";
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var square = document.createElement("div");
			square.classList.add("square");
			square.classList.add(grid[i][j]);

			// if the square is a gold square, add a span inside of the div
			if (grid[i][j] === "gold") {
				var span = document.createElement("span");
				square.appendChild(span);
			}

			content.appendChild(square);
		}
	}
}
