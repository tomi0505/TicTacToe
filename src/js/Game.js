class Game {
	constructor() {
		this.players = ['Computer', 'Player1'];
		this.activePlayer = this.randPlayer();
		this.gameAreaEl = document.querySelector('.game-area-b');
		this.showGameAreaEl();
		this.gameAreaElHandler();
	}

	gameAreaElHandler() {
		this.gameAreaEl.addEventListener('click', e => {
			if(e.target.closest('.game-area-b__area-simple')) {

			}
		});
	}

	randPlayer() {
		const index = Math.floor(Math.random() * this.players.length);
		const activePlayer = this.players[index];

		return activePlayer;
	}

	showGameAreaEl() {
		this.gameAreaEl.classList.remove('game-area-b--hidden');
	}
}

export default Game;