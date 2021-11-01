// Getting the neighbors of a cell
function getNeighbors(row, col) {
	let neighbors = [];
	if (row > 0) {
		neighbors.push({ row: row - 1, col: col });
	}
	if (row < 9) {
		neighbors.push({ row: row + 1, col: col });
	}
	if (col > 0) {
		neighbors.push({ row: row, col: col - 1 });
	}
	if (col < 9) {
		neighbors.push({ row: row, col: col + 1 });
	}
	return neighbors;
}

// BFS
function bfs(grid, playerRow, playerCol) {
	let goalRow;
	let goalCol;
	for (let row = 0; row < grid.length; row++) {
		for (let col = 0; col < grid[0].length; col++) {
			if (grid[row][col] === "gold") {
				goalRow = row;
				goalCol = col;
			}
		}
	}

	let queue = [];
	let visited = [];

	for (let i = 0; i < 10; i++) {
		visited[i] = [];
		for (let j = 0; j < 10; j++) {
			visited[i][j] = false;
		}
	}

	let current = {
		row: playerRow,
		col: playerCol,
	};

	queue.push(current);
	visited[current.row][current.col] = true;

	i = 1;

	while (queue.length > 0) {
		current = queue.shift();

		if (current.row === goalRow && current.col === goalCol) {
			return true;
		}

		let neighbors = getNeighbors(current.row, current.col);
		for (let i = 0; i < neighbors.length; i++) {
			let neighbor = neighbors[i];
			if (
				grid[neighbor.row][neighbor.col] === "black" &&
				!visited[neighbor.row][neighbor.col]
			) {
				visited[neighbor.row][neighbor.col] = true;
				queue.push(neighbor);
			}

			if (grid[neighbor.row][neighbor.col] === "gold") {
				return true;
			}
		}
	}

	return false;
}
