import Player from "./Player";

class AI extends Player {
	constructor(id, name, symbol) {
	  super(id, name, symbol);
		this.type = 'ai';
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

        if(this.doIWin()) {
          this.winner = true;
          this.showWinnerModal();
          return;
        } else if(!this.gameOverWithoutWinner()) {
          this.showWinnerModal('remis', true);
          return;
        }

        this.markCurrentPlayer(this.secondPlayer);

        this.secondPlayer.nextMove = true;
        this.secondPlayer.move();
      }
    }, this.drawAITimeThinking())
	}
}

export default AI;