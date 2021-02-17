class AI {
	constructor(id, name, symbol) {
		this.id = id;
		this.name = name;
		this.symbol = symbol;
	}

	drawArea() {
		let activesGamesAreasEl = document.querySelectorAll('.game-area-b__area-simple--active');
		activesGamesAreasEl = [...activesGamesAreasEl];

		const index = Math.floor(Math.random() * activesGamesAreasEl.length);
		const freeAreaEl = activesGamesAreasEl[index];

		return freeAreaEl;
	}

	move() {
		const areaEl = this.drawArea();
		areaEl.classList.remove('game-area-b__area-simple--active');
		areaEl.innerHTML = this.symbol;
	}
}

export default AI;