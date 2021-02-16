import Game from './Game';
import AI from "./AI";
import Player from "./Player";

class App {
	constructor() {
		this.ai = new AI(0, 'AI', 'O');
		this.player1 = new Player(1, 'Tomek', 'X');
		this.player2 = new Player(2, 'Kowalski', 'O');
		this.players = [this.ai, this.player1];
		this.activePlayer = null;
		this.games = [];
		this.startGameBtn = document.querySelector('.start-game-btn-b');
		this.startGameBtnHandler();
	}

	randPlayer() {
		const index = Math.floor(Math.random() * this.players.length);
		const activePlayer = this.players[index];

		return activePlayer;
	}

	startGameBtnHandler() {
		this.startGameBtn.addEventListener('click', e => {
			this.activePlayer = this.randPlayer();

			const game = new Game(this.ai, this.player1, this.player2, this.activePlayer);
			this.games.push(game);

			e.target.classList.add('start-game-btn-b--hidden');
			console.log('this.games: ', this.games);
		});
	}
}

export default App;