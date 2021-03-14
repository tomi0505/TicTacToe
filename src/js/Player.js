class Player {
	constructor(id, name, symbol) {
		this.id = id;
		this.type = 'user';
		this.name = name;
		this.symbol = symbol;
		this.choosedGameAreas = [];
    this.winGamePattern = {
      x1: [0, 1, 2],
      x2: [3, 4, 5],
      x3: [6, 7, 8],
      y1: [0, 3, 6],
      y2: [1, 4, 7],
      y3: [2, 5, 8],
      z1: [0, 4, 8],
      z2: [2, 4, 6]
    };
    this.nextMove = false;
    this.currentPlayer = this;
    this.gameAreaEl = document.querySelector('.game-area-b');
    this.currentPlayerMovingEl = document.querySelector('.current-player-moving-b__name');
    this.gameWinnerModalEl = document.querySelector('.modal-b');
    this.winnerPlayerNameInModalEl = document.querySelector('.game-winner-alert-b__winner-player-name');
	}

	showWinnerModal() {
    this.gameWinnerModalEl.classList.remove('modal-b--hidden');
    this.winnerPlayerNameInModalEl.textContent = `${this.currentPlayer.name}`;
  }

	doIWin() {
    let winner = false;

    if(this.choosedGameAreas.length > 2) {
      for(let winGamePatternItem in this.winGamePattern) {
        let winGamePatternItemValue = this.winGamePattern[winGamePatternItem];
        winner = winGamePatternItemValue.every(item => {
          return this.currentPlayer.choosedGameAreas.indexOf(item) !== -1;
        });

        if(winner) return winner;
      }
    }

    return winner;
  }

  checkUnactiveArea(player, activeArea) {
    activeArea.classList.remove('game-area-b__area-simple--active');
    activeArea.classList.add(`game-area-b__area-simple--select-${player.type}-${player.id}`);
    activeArea.innerHTML = player.symbol;
  }

  markCurrentPlayer(player) {
    this.currentPlayerMovingEl.className = '';
    this.currentPlayerMovingEl.classList.add(`current-player-moving-b__name`, `current-player-moving-b__name--select-${player.type}-${player.id}`);
  }

	move() {
    this.currentPlayerMovingEl.textContent = this.name;
    this.markCurrentPlayer(this);

    console.log('this move Player: ', this);

    this.gameAreaEl.addEventListener('click', e => {
      e.stopImmediatePropagation();
      console.log('this move Player inner: ', this);

      if(this.nextMove && this.secondPlayer.type === 'ai') {
        const activeArea = e.target.closest('.game-area-b__area-simple--active');

        this.currentPlayerMovingEl.textContent = this.currentPlayer.name;
        this.markCurrentPlayer(this.currentPlayer.secondPlayer);

        if(activeArea) {
          const activeAreaIndex = [...activeArea.parentNode.children].indexOf(activeArea);
          this.choosedGameAreas.push(activeAreaIndex);
          this.checkUnactiveArea(this, activeArea);

          if(this.doIWin()) {
            this.showWinnerModal();
            return;
          }

          this.nextMove = false;
          this.secondPlayer.move();
        }
      } else if (this.secondPlayer.type === 'user') {
        const activeArea = e.target.closest('.game-area-b__area-simple--active');

        if(activeArea) {
          const activeAreaIndex = [...activeArea.parentNode.children].indexOf(activeArea);
          this.currentPlayer.choosedGameAreas.push(activeAreaIndex);
          this.checkUnactiveArea(this.currentPlayer, activeArea);

          if(this.doIWin()) {
            this.showWinnerModal();
            return;
          }

          this.currentPlayer = this.currentPlayer.secondPlayer;
          this.currentPlayerMovingEl.textContent = this.currentPlayer.name;

          this.markCurrentPlayer(this.currentPlayer);
        }
      }
    });
	}
}

export default Player;