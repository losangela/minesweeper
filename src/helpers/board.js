class Box {
  constructor(val) {
    this.val = val;
    this.isOpen = false;
    this.isFlagged = false;
  }

  canOpen() {
    return !this.isOpen && !this.isFlagged;
  }

  openBox() {
    if (this.canOpen()) {
      this.isOpen = true;
    }
  }

  flagBox() {
    if (this.canOpen()) {
      this.isFlagged = true;
    }
  }
};

const BoardSize = {
  'small': [10, 8, 10],
  'medium': [10, 10, 10],
  'large': [20, 20, 10],
};

class Board {
  constructor(size) { // 'small' = 10x8, 'medium', 'large'
    this.size = size;
    this.reset();
  }

  reset() {
    console.log('resetting')
    this.board = this.createNewBoard(this.size)
  }

  createNewBoard(size) {
    const [columns, rows] = BoardSize[size];
    const newBoard = [];
    for (let i = 0; i < rows; i++) {
      const newRow = [];
      for (let j = 0; j < columns; j++) {
        newRow.push(new Box(0))
      }
      newBoard.push(newRow);
    }
    return newBoard;
  }
};

export default new Board('small');