class Game {
	constructor(player1, player2) {
		this.player1 = player1;
		this.player2 = player2;
		this.activePlayer = this.randStartPlayer();
		this.activeArea = null;
    this.gameAreaEl = document.querySelector('.game-area-b');
		this.showGameAreaEl();
		this.firstPlayerMove();
	}

	firstPlayerMove() {
		if(this.activePlayer.type === 'ai') {
			this.activePlayer.move();
		} else if (this.activePlayer.type === 'user') {
      this.activePlayer.nextMove = true;
		  this.activePlayer.move();
		}
	}

  randStartPlayer() {
    const index = Math.floor(Math.random() * 2 + 1);
    const activePlayer = this[`player${index}`];
    return activePlayer;
  }

	showGameAreaEl() {
		this.gameAreaEl.classList.remove('game-area-b--hidden');
	}
}

export default Game;