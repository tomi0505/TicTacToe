import Game from './Game';
import Player from "./Player";

class App {
	constructor() {
		this.ai = new Player(0, 'AI', 'O');
		this.player1 = new Player(1, 'Tomek', 'X');
		this.players = [this.ai, this.player1];
		this.activePlayer = this.randPlayer();
		this.games = [];
		this.startGameBtn = document.querySelector('.start-game-btn-b');
		this.startGameBtnHandler();
	}

	startGameBtnHandler() {
		this.startGameBtn.addEventListener('click', e => {
			const game = new Game(this.ai, this.player1, this.activePlayer);
			this.games.push(game);

			e.target.classList.add('start-game-btn-b--hidden');
			console.log('this.games: ', this.games);
		});
	}

	randPlayer() {
		const index = Math.floor(Math.random() * this.players.length);
		const activePlayer = this.players[index];

		return activePlayer;
	}
}

export default App;