class Game {
	constructor(player1, player2) {
		this.player1 = player1;
		this.player2 = player2;
		this.activePlayer = this.randStartPlayer();
		this.activeArea = null;
		this.gameAreaEl = document.querySelector('.game-area-b');
		this.showGameAreaEl();
		this.gameAreaElClickHandler();
		this.playerMove();
	}

	playerMove() {
		if(this.activePlayer.type === 'ai') {
			this.activePlayer.move();
			this.activePlayer = this.player2;

		} else if (this.activePlayer.type === 'user' && this.userClicked) {
        this.activePlayer.move(this.activeArea);
        this.activePlayer = this.player1;

        this.activePlayer.move();
        this.activePlayer = this.player2;
		}
	}

	randStartPlayer() {
		const index = Math.floor(Math.random() * 2 + 1);
		const activePlayer = this[`player${index}`];
		return activePlayer;
	}

  gameAreaElClickHandler() {
    this.gameAreaEl.addEventListener('click', e => {
      this.userClicked = true;
      this.activeArea = e.target.closest('.game-area-b__area-simple--active');
      this.activeArea ? this.playerMove() : 'nie ma pola do gry';
    });
  }

	showGameAreaEl() {
		this.gameAreaEl.classList.remove('game-area-b--hidden');
	}
}

export default Game;