class Game {
	constructor(ai, player1, player2, activePlayer) {
		this.ai = ai;
		this.player1 = player1;
		this.player2 = player2;
		this.activePlayer = activePlayer;
		this.activeArea = null;
		this.gameAreaEl = document.querySelector('.game-area-b');
		this.showGameAreaEl();
		this.gameAreaElHandler();
	}

	playerMove(e) {
		this.activeArea = e.target.closest('.game-area-b__area-simple--active');

		if(this.activeArea) {
			if(this.activePlayer.id === this.ai.id) {
				this.ai.move();
				this.activePlayer = this.player1;
			} else if (this.activePlayer.id === this.player1.id) {
				this.player1.move(this.activeArea);
				this.activePlayer = this.ai;
			} else {
				this.player2.move(this.activeArea);
				this.activePlayer = this.player1;
			}
		}
	}

	gameAreaElHandler() {
		this.gameAreaEl.addEventListener('click', e => this.playerMove(e));
	}

	showGameAreaEl() {
		this.gameAreaEl.classList.remove('game-area-b--hidden');
	}
}

export default Game;