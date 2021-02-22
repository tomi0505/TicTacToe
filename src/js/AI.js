class AI {
	constructor(id, name, symbol) {
		this.id = id;
		this.type = 'ai';
		this.name = name;
		this.symbol = symbol;
    this.choosedGameAreas = [];
	}

	drawFreeArea() {
		let activesGamesAreasEl = document.querySelectorAll('.game-area-b__area-simple--active');
		activesGamesAreasEl = [...activesGamesAreasEl];

		const index = Math.floor(Math.random() * activesGamesAreasEl.length);
		const freeAreaEl = activesGamesAreasEl[index];

		return freeAreaEl;
	}

	move() {
		const activeArea = this.drawFreeArea();

		if(activeArea) {
      const activeAreaIndex = [...activeArea.parentNode.children].indexOf(activeArea);
      this.choosedGameAreas.push(activeAreaIndex);
      activeArea.classList.remove('game-area-b__area-simple--active');
      activeArea.innerHTML = this.symbol;
    }
	}
}

export default AI;