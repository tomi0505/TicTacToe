import Player from "./Player";

class AI extends Player {
	constructor(id, name, symbol) {
	  super();
		this.id = id;
		this.type = 'ai';
		this.name = name;
		this.symbol = symbol;
    this.choosedGameAreas = [];
    this.winGamePattern = {
      x1: [0, 1, 2],
      x2: [3, 4, 5],
      x3: [6, 7, 8],
      y1: [0, 3, 6],
      y2: [1, 4, 7],
      y3: [2, 5, 8],
      z1: [0, 4, 8],
      z2: [2, 4, 6]
    };
    this.currentPlayerMovingEl = document.querySelector('.current-player-moving-b__name');
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
	  this.currentPlayerMovingEl.textContent = `${this.name} myśli...`;

    setTimeout(() => {
      const activeArea = this.drawFreeArea();

      if(activeArea) {
        const activeAreaIndex = [...activeArea.parentNode.children].indexOf(activeArea);
        this.choosedGameAreas.push(activeAreaIndex);
        this.checkUnactiveArea(this, activeArea);

        if(this.doIWin()) alert(`Gratulacje ${this.name}, WYGRAŁEŚ!`);

        this.markCurrentPlayer(this.secondPlayer);

        this.secondPlayer.nextMove = true;
        this.secondPlayer.move();
      }
    }, this.drawAITimeThinking())
	}
}

export default AI;