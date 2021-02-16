class Player {
	constructor(id, name, symbol) {
		this.id = id;
		this.name = name;
		this.symbol = symbol;
	}

	move(activeArea) {
		activeArea.classList.remove('game-area-b__area-simple--active');
		activeArea.innerHTML = this.symbol;
	}
}

export default Player;