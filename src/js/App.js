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
		this.secondPlayerType = 'ai';
		this.selectGameTypeForm = document.querySelector('.start-game-form-b');
		this.player1NameInput = document.getElementById('player1NameInput');
		this.player2NameInput = document.getElementById('player2NameInput');
		this.gameWithAI = document.getElementById('gameWithAI');
		this.gameWithUser = document.getElementById('gameWithUser');
		this.startGameBtn = document.querySelector('.start-game-btn-b');
		this.startGameBtnHandler();
	}

	randPlayer() {
		const index = Math.floor(Math.random() * this.players.length);
		const activePlayer = this.players[index];

		return activePlayer;
	}

	startGameFormValidation() {
		if(this.player1NameInput.value.trim() == '') {
			alert('Wpisz swoje imię');
			return false;
		}

		if(this.secondPlayerType === 'user') {
			if(this.player2NameInput.value.trim() == '') {
				alert('Wpisz imię 2-giego gracza');
				return false;
			} else {
				return true;
			}
		} else {
			return true;
		}
	}

	startGameBtnHandler() {
		this.startGameBtn.addEventListener('click', e => {
			this.secondPlayerType = document.querySelector('input[name="select-game-type"]:checked').value;
			const startGameFormValidationOK = this.startGameFormValidation();

			if(startGameFormValidationOK) {
				this.activePlayer = this.randPlayer();

				const game = new Game(this.ai, this.player1, this.player2, this.activePlayer);
				this.games.push(game);

				e.target.classList.add('start-game-btn-b--hidden');
				this.selectGameTypeForm.classList.add('start-game-form-b--hidden');
			}
		});
	}
}

export default App;