class Player {
	constructor(id, name, symbol) {
		this.id = id;
		this.type = 'user';
		this.name = name;
		this.symbol = symbol;
		this.choosedGameAreas = [];
	}

	move(activeArea) {
		if(activeArea) {
		  const activeAreaIndex = [...activeArea.parentNode.children].indexOf(activeArea);
      this.choosedGameAreas.push(activeAreaIndex);
      activeArea.classList.remove('game-area-b__area-simple--active');
      activeArea.innerHTML = this.symbol;
    }
	}
}

export default Player;