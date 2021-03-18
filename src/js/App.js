import Game from './Game';
import AI from "./AI";
import Player from "./Player";

class App {
	constructor() {
		this.games = [];
		this.secondPlayerType = '';
		this.pageContainerEl = document.querySelector('.container-b');
		this.currentPlayerMovingEl = document.querySelector('.current-player-moving-b');
		this.selectGameTypeForm = document.querySelector('.start-game-form-b');
		this.player1NameInput = document.getElementById('player1NameInput');
		this.player2NameInput = document.getElementById('player2NameInput');
		this.startGameBtn = document.querySelector('.start-game-btn-b');
		this.startGameAgainBtn = document.querySelector('.start-new-game-again-btn-b');
    this.gameWinnerModalEl = document.querySelector('.modal-b');
		this.startGameBtnHandler();
	}

  clearGameAreaEl() {
    const gameAreaEl = document.querySelector('.game-area-b');

    const gameaAreaElPattern = `
      <section class="game-area-b game-area-b--hidden">
        <div class="game-area-b__area-simple game-area-b__area-simple--active"></div>
        <div class="game-area-b__area-simple game-area-b__area-simple--active"></div>
        <div class="game-area-b__area-simple game-area-b__area-simple--active"></div>
        <div class="game-area-b__area-simple game-area-b__area-simple--active"></div>
        <div class="game-area-b__area-simple game-area-b__area-simple--active"></div>
        <div class="game-area-b__area-simple game-area-b__area-simple--active"></div>
        <div class="game-area-b__area-simple game-area-b__area-simple--active"></div>
        <div class="game-area-b__area-simple game-area-b__area-simple--active"></div>
        <div class="game-area-b__area-simple game-area-b__area-simple--active"></div>
      </section>
    `;

    this.pageContainerEl.removeChild(gameAreaEl);
    this.selectGameTypeForm.insertAdjacentHTML('beforebegin', gameaAreaElPattern);
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

	startGame() {
    this.gameWinnerModalEl.classList.add('modal-b--hidden');
    this.clearGameAreaEl();

    this.secondPlayerType = document.querySelector('input[name="select-game-type"]:checked').value;
    const startGameFormValidationOK = this.startGameFormValidation();

    if(startGameFormValidationOK) {
      this.pageContainerEl.classList.add('container-b--medium');

      if(this.secondPlayerType === 'ai') {
        const userAI = new AI(0, 'AI', 'O');
        const userPlayer1 = new Player(1, this.player1NameInput.value, 'X');

        userAI.secondPlayer = userPlayer1;
        userPlayer1.secondPlayer = userAI;

        const game = new Game(this.games.length, userAI, userPlayer1);
        this.games.push(game);
      } else if (this.secondPlayerType === 'user') {
        const userPlayer1 = new Player(1, this.player1NameInput.value, 'X');
        const userPlayer2 = new Player(2, this.player2NameInput.value, 'O');

        userPlayer1.secondPlayer = userPlayer2;
        userPlayer2.secondPlayer = userPlayer1;

        const game = new Game(this.games.length, userPlayer1, userPlayer2);
        this.games.push(game);
      }

      this.currentPlayerMovingEl.classList.remove('current-player-moving-b--hidden');
      this.selectGameTypeForm.classList.add('start-game-form-b--hidden');
    }
  }

	startGameBtnHandler() {
    this.startGameBtn.addEventListener('click', e => {
      this.startGame();
      // e.target.classList.add('start-game-btn-b--hidden');
    });
    this.startGameAgainBtn.addEventListener('click', () => this.startGame());
	}
}

export default App;