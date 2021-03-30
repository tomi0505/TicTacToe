import Game from './Game';
import AI from "./AI";
import Player from "./Player";

class App {
	constructor() {
		this.games = [];
		this.secondPlayerType = '';
		this.gameContainerEl = document.querySelector('.game-container-b');
		this.currentPlayerMovingEl = document.querySelector('.current-player-moving-b');
		this.selectGameTypeForm = document.querySelector('.start-game-form-b');
		this.player1NameInput = document.getElementById('player1NameInput');
		this.player2NameInput = document.getElementById('player2NameInput');
		this.startGameBtn = document.querySelector('.start-game-btn-b');
		this.gameResultsPanelEl = document.querySelector('.game-results-panel-b');
    this.gameCounterEl = document.querySelector('.game-results-panel-b__game-counter');
    this.gameResultsPanelPlayer1El = document.querySelector('.game-results-panel-b__player-1');
    this.gameResultsPanelPlayer2El = document.querySelector('.game-results-panel-b__player-2');
		this.startGameAgainBtn = document.querySelector('.start-new-game-again-btn-b');
    this.showGameResultsListBtn = document.querySelector('.show-game-results-list-btn-b');
    this.gameResultsListEl = document.querySelector('.game-results-list-b');
    this.resultBoxesContainerEl = document.querySelector('.game-results-list-b__result-boxes-container');
    this.closeGameResultsListBtn = document.querySelector('.game-results-list-b__close-btn');
    this.gameWinnerModalEl = document.querySelector('.modal-b');
    this.init();
		this.startGameBtnHandler();
		this.showGameResultsListBtnHandler();
		this.closeGameResultsListBtnHandler();
	}

	init() {
	  document.addEventListener('click', e => {
      console.log('e.target: ', e.target);
      console.log("e.target.closest('.game-results-list-b'): ", e.target.closest('.game-results-list-b'));
      console.log("e.target.closest('.show-game-results-list-btn-b')", e.target.closest('.show-game-results-list-btn-b'));

      if(!e.target.closest('.game-results-list-b') && !e.target.closest('.show-game-results-list-btn-b')) {
        this.gameResultsListEl.classList.add('game-results-list-b--hidden');
      }
    });
  }

	renderGameResultsList() {
    this.resultBoxesContainerEl.innerHTML = '';

    if(this.games.length > 0) {
      this.games.forEach(gameItem => {
        const resultBoxSimpleEl = document.createElement('section');
        resultBoxSimpleEl.classList.add('game-results-list-b__result-box-simple');

        const winnerPlayer = gameItem.player1.winner ? gameItem.player1 : gameItem.player2;
        const loserPlayer = !gameItem.player1.winner ? gameItem.player1 : gameItem.player2;

        const resultBoxSimpleContentPattern = `
        <h6 class="game-results-list-b__result-box-simple-title">gra ${gameItem.number + 1}</h6>
        <p class="game-results-list-b__result-box-simple-winner-player-content">
					Wygrał
					<span>${winnerPlayer.name}</span>
					(<span>${winnerPlayer.choosedGameAreas.length}</span>)
					ruchów
				</p>
				<p class="game-results-list-b__result-box-simple-looser-player-content">
					Przegrał
					<span>${loserPlayer.name}</span>
					(<span>${loserPlayer.choosedGameAreas.length}</span>)
					ruchów
				</p>
      `;

        resultBoxSimpleEl.innerHTML = resultBoxSimpleContentPattern;
        this.resultBoxesContainerEl.appendChild(resultBoxSimpleEl);
      });
    }
  }

  closeGameResultsListBtnHandler() {
    this.closeGameResultsListBtn.addEventListener('click', () => {
      this.gameResultsListEl.classList.add('game-results-list-b--hidden');
    });
  }

	showGameResultsListBtnHandler() {
    this.showGameResultsListBtn.addEventListener('click', () => {
      this.gameResultsListEl.classList.toggle('game-results-list-b--hidden');
    });
  }

	updateWinnerPlayers() {
    const player1GameWinners = this.games.filter(game => {
      return game.player1.winner === true;
    });

    const player2GameWinners = this.games.filter(game => {
      return game.player2.winner === true;
    });

    this.gameResultsPanelPlayer1El.textContent = player1GameWinners.length;
    this.gameResultsPanelPlayer2El.textContent = player2GameWinners.length;
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

    this.gameContainerEl.removeChild(gameAreaEl);
    this.gameResultsPanelEl.insertAdjacentHTML('beforebegin', gameaAreaElPattern);
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
    console.log('this.games: ', this.games);
    this.gameCounterEl.textContent = this.games.length + 1;
    this.updateWinnerPlayers();
    this.gameWinnerModalEl.classList.add('modal-b--hidden');
    this.clearGameAreaEl();

    this.secondPlayerType = document.querySelector('input[name="select-game-type"]:checked').value;
    const startGameFormValidationOK = this.startGameFormValidation();

    if(startGameFormValidationOK) {
      this.gameContainerEl.classList.add('game-container-b--medium');

      if(this.secondPlayerType === 'ai') {
        const userAI = new AI(0, 'AI', 'O');
        const userPlayer1 = new Player(1, this.player1NameInput.value, 'X');

        userAI.secondPlayer = userPlayer1;
        userPlayer1.secondPlayer = userAI;

        const game = new Game(this.games.length, userPlayer1, userAI);
        this.games.push(game);
      } else if (this.secondPlayerType === 'user') {
        const userPlayer1 = new Player(1, this.player1NameInput.value, 'X');
        const userPlayer2 = new Player(2, this.player2NameInput.value, 'O');

        userPlayer1.secondPlayer = userPlayer2;
        userPlayer2.secondPlayer = userPlayer1;

        const game = new Game(this.games.length, userPlayer1, userPlayer2);
        this.games.push(game);
      }

      this.gameContainerEl.classList.remove('game-container-b--hidden');
      this.currentPlayerMovingEl.classList.remove('current-player-moving-b--hidden');
      this.gameResultsPanelEl.classList.remove('game-results-panel-b--hidden');
      this.selectGameTypeForm.classList.add('start-game-form-b--hidden');
    }
  }

	startGameBtnHandler() {
    this.startGameBtn.addEventListener('click', e => {
      this.startGame();
    });

    this.startGameAgainBtn.addEventListener('click', () => {
      this.renderGameResultsList();
      this.startGame();
    });
	}
}

export default App;