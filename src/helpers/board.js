class Box {
  constructor(val) {
    this.val = val;
    this.isOpen = false;
    this.isFlagged = false;
  }

  canOpen() {
    return !this.isOpen && !this.isFlagged;
  }

  openBox(override) {
    if (override || this.canOpen()) {
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
  'medium': [18, 14, 40],
  'large': [24, 20, 99],
};

class Board {
  constructor(size) { // 'small' = 10x8, 'medium', 'large'
    this.size = size;
    this.reset();
  }

  reset() {
    this.isGameOver = false;
    this.bombCount = BoardSize[this.size][2];
    this.board = this.createNewBoard(this.size)
  }

  changeSize(size) {
    if (this.size === 'small') {
      this.size = 'medium';
    } else if (this.size === 'medium') {
      this.size = 'large';
    } else if (this.size === 'large') {
      this.size = 'small';
    }
    this.reset();
  }

  createNewBoard(size) {
    const [columns, rows, bombCount] = BoardSize[size];
    const newBoard = [];
    const bombIndexes = [];
    // add bomb indexes
    while (bombIndexes.length < bombCount) {
      let newBombIndex = Math.floor(Math.random() * columns * rows);
      if (!bombIndexes.includes(newBombIndex)) {
        bombIndexes.push(newBombIndex);
      }
    }
    bombIndexes.sort((a, b) => b - a);
    let nextBomb = bombIndexes.pop();

    // populate board with bombs and blanks
    for (let i = 0; i < rows; i++) {
      const newRow = [];
      for (let j = 0; j < columns; j++) {
        if ((i * columns) + j === nextBomb) { // if bomb index
          nextBomb = bombIndexes.pop();
          newRow.push(new Box(-1))
        } else { // not bomb index
          newRow.push(new Box(0))
        }
      }
      newBoard.push(newRow);
    }


    // traverse board again and replace blanks with numbers
    const bombPerimeterCount = (i, j) => {
      let count = 0;
      if (i - 1 >= 0 && newBoard[i - 1][j].val < 0) { // check top
        count++
      }
      if (i - 1 >= 0 && j + 1 < columns && newBoard[i - 1][j + 1].val < 0) { // check top right
        count++
      }
      if (j + 1 < columns && newBoard[i][j + 1].val < 0) { // check right
        count++
      }
      if (i + 1 < rows && j + 1 < columns && newBoard[i + 1][j + 1].val < 0) { // check bottom right
        count++
      }
      if (i + 1 < rows && newBoard[i + 1][j].val < 0) { // check bottom
        count++
      }
      if (i + 1 < rows && j - 1 >= 0 && newBoard[i + 1][j - 1].val < 0) { // check bottom left
        count++
      }
      if (j - 1 >= 0 && newBoard[i][j - 1].val < 0) { // check left
        count++
      }
      if (i - 1 >= 0 && j - 1 >= 0 && newBoard[i - 1][j - 1].val < 0) {// check top left
        count++
      }
      return count
    };

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (newBoard[i][j].val !== -1) { // if not bomb
          newBoard[i][j].val = bombPerimeterCount(i, j);
        }
      }
    }
    return newBoard;
  }

  setFlag(i, j) {
    this.board[i][j].flagBox();
  }

  openBox(i, j) {
    const box = this.board[i][j];
    const [columns, rows] = BoardSize[this.size];
    if (!box.canOpen() || this.isGameOver) {
      return;
    }
    
    const checkPerimeter = (i, j) => {
      if (i - 1 >= 0 && this.board[i - 1][j].canOpen()) { // check top
        this.board[i - 1][j].openBox();
        if (this.board[i - 1][j].val === 0) {
          checkPerimeter(i-1, j)
        }
      }
      if (i - 1 >= 0 && j + 1 < columns && this.board[i - 1][j + 1].canOpen()) { // check top right
        this.board[i - 1][j + 1].openBox();
        if (this.board[i - 1][j + 1].val === 0) {
          checkPerimeter(i-1, j+1);
        }
      }
      if (j + 1 < columns && this.board[i][j + 1].canOpen()) { // check right
        this.board[i][j + 1].openBox();
        if (this.board[i][j + 1].val === 0) {
          checkPerimeter(i, j+1);
        }
      }
      if (i + 1 < rows && j + 1 < columns && this.board[i + 1][j + 1].canOpen()) { // check bottom right
        this.board[i + 1][j + 1].openBox();
        if (this.board[i + 1][j + 1].val === 0) {
          checkPerimeter(i+1, j+1);
        }
      }
      if (i + 1 < rows && this.board[i + 1][j].canOpen()) { // check bottom
        this.board[i + 1][j].openBox();
        if (this.board[i + 1][j].val === 0) {
          checkPerimeter(i+1, j);
        }
      }
      if (i + 1 < rows && j - 1 >= 0 && this.board[i + 1][j - 1].canOpen()) { // check bottom left
        this.board[i + 1][j - 1].openBox();
        if (this.board[i + 1][j - 1].val === 0) {
          checkPerimeter(i+1, j-1);
        }
      }
      if (j - 1 >= 0 && this.board[i][j - 1].canOpen()) { // check left
        this.board[i][j - 1].openBox();
        if (this.board[i][j - 1].val === 0) {
          checkPerimeter(i, j-1);
        }
      }
      if (i - 1 >= 0 && j - 1 >= 0 && this.board[i - 1][j - 1].canOpen()) {// check top left
        this.board[i - 1][j - 1].openBox();
        if (this.board[i - 1][j - 1].val === 0) {
          checkPerimeter(i-1, j-1);
        }
      }
    };

    box.openBox();
    if (box.val === 0) {
      checkPerimeter(i, j)
    } else if (box.val === -1) {
      this.isGameOver = true;
      this._seeAllBombs();
      return;
    }
    this._checkIfGameDone();
  }

  _seeAll() {
    const [columns, rows] = BoardSize[this.size];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        this.board[i][j].openBox(true);
      }
    }
    this.isGameOver = true;
  }

  _seeAllBombs() {
    const [columns, rows] = BoardSize[this.size];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (this.board[i][j].val === -1) {
          this.board[i][j].openBox(true);
        }
      }
    }
  }

  _checkIfGameDone() {
    const [columns, rows] = BoardSize[this.size];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (this.board[i][j].val !== -1 && !this.board[i][j].isOpen) {
          return false;
        }
      }
    }
    this.isGameOver = true;
    return true;
  }
};

export default new Board('small');