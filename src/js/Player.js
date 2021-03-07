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
    this.currentPlayerMovingEl = document.querySelector('.current-player-moving-b');
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

	move() {
    this.currentPlayerMovingEl.textContent = this.name;

    this.gameAreaEl.addEventListener('click', e => {
      if(this.nextMove && this.secondPlayer.type === 'ai') {
        this.currentPlayerMovingEl.textContent = this.currentPlayer.name;
        const activeArea = e.target.closest('.game-area-b__area-simple--active');

        if(activeArea) {
          const activeAreaIndex = [...activeArea.parentNode.children].indexOf(activeArea);
          this.choosedGameAreas.push(activeAreaIndex);
          activeArea.classList.remove('game-area-b__area-simple--active');
          activeArea.innerHTML = this.symbol;

          if(this.doIWin()) alert(`Gratulacje ${this.currentPlayer.name}, WYGRAŁEŚ!`);

          this.nextMove = false;
          this.secondPlayer.move();
        }
      } else if (this.secondPlayer.type === 'user') {
        const activeArea = e.target.closest('.game-area-b__area-simple--active');

        if(activeArea) {
          const activeAreaIndex = [...activeArea.parentNode.children].indexOf(activeArea);
          this.currentPlayer.choosedGameAreas.push(activeAreaIndex);
          activeArea.classList.remove('game-area-b__area-simple--active');
          activeArea.innerHTML = this.currentPlayer.symbol;

          if(this.doIWin()) alert(`Gratulacje ${this.currentPlayer.name}, WYGRAŁEŚ!`);

          this.currentPlayer = this.currentPlayer.secondPlayer;
          this.currentPlayerMovingEl.textContent = this.currentPlayer.name;
        }
      }
    });
	}
}

export default Player;