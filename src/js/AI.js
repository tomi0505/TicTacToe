class AI {
	constructor(id, name, symbol) {
		this.id = id;
		this.type = 'ai';
		this.name = name;
		this.symbol = symbol;
    this.choosedGameAreas = [];
    this.currentPlayerMovingEl = document.querySelector('.current-player-moving-b');
	}

	drawFreeArea() {
		let activesGamesAreasEl = document.querySelectorAll('.game-area-b__area-simple--active');
		activesGamesAreasEl = [...activesGamesAreasEl];

		const index = Math.floor(Math.random() * activesGamesAreasEl.length);
		const freeAreaEl = activesGamesAreasEl[index];

		return freeAreaEl;
	}

	drawAITimeThinking() {
	  const timeThinking = Math.floor(Math.random() * 6);
	  const timeThinkingInMiliseconds = timeThinking * 1000;

	  return timeThinkingInMiliseconds;
  }

	move() {
    this.currentPlayerMovingEl.textContent = this.name;

    setTimeout(() => {
      const activeArea = this.drawFreeArea();

      if(activeArea) {
        const activeAreaIndex = [...activeArea.parentNode.children].indexOf(activeArea);
        this.choosedGameAreas.push(activeAreaIndex);
        activeArea.classList.remove('game-area-b__area-simple--active');
        activeArea.innerHTML = this.symbol;

        this.secondPlayer.nextMove = true;
        this.secondPlayer.move();
      }
    }, this.drawAITimeThinking())
	}
}

export default AI;