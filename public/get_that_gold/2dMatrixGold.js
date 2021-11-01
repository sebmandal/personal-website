// getting the player's current score
function getGold() {
	var goldCounter = document.querySelector("#gold-counter");
	return parseInt(goldCounter.innerHTML);
}

// setting the player's current score
function setGold(gold) {
	var goldCounter = document.querySelector("#gold-counter");
	goldCounter.innerHTML = gold;
}
