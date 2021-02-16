import Game from './Game';

class App {
	constructor() {
		this.games = [];
		this.startGameBtn = document.querySelector('.start-game-btn-b');
		this.startGameBtnHandler();
	}

	startGameBtnHandler() {
		this.startGameBtn.addEventListener('click', e => {
			const game = new Game();
			this.games.push(game);

			e.target.classList.add('start-game-btn-b--hidden');
			console.log('this.games: ', this.games);
		});
	}
}

export default App;