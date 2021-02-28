class Player {
	constructor(id, name, symbol, opponent) {
		this.id = id;
		this.type = 'user';
		this.name = name;
		this.symbol = symbol;
		this.choosedGameAreas = [];
    this.nextMove = false;
    this.currentPlayer = this;
    this.gameAreaEl = document.querySelector('.game-area-b');
    this.currentPlayerMovingEl = document.querySelector('.current-player-moving-b');
	}

	move() {
    this.currentPlayerMovingEl.textContent = this.name;
    console.log('xyz1', this);

    this.gameAreaEl.addEventListener('click', e => {
      if(this.nextMove && this.secondPlayer.type === 'ai') {
        const activeArea = e.target.closest('.game-area-b__area-simple--active');

        if(activeArea) {
          const activeAreaIndex = [...activeArea.parentNode.children].indexOf(activeArea);
          this.choosedGameAreas.push(activeAreaIndex);
          activeArea.classList.remove('game-area-b__area-simple--active');
          activeArea.innerHTML = this.symbol;

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
          console.log('this: ', this.currentPlayer);
          // this.secondPlayer.move.call(this.secondPlayer);
          this.currentPlayer = this.currentPlayer.secondPlayer;
        }
      }
    });
	}
}

export default Player;