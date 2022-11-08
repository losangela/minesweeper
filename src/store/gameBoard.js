import { createSlice } from '@reduxjs/toolkit'
import Box from '../helpers/box-model';

const BOARD_SIZE_SMALL = 'SMALL';
const BOARD_SIZE_MEDIUM = 'MEDIUM';
const BOARD_SIZE_LARGE = 'LARGE';

const BoardSize = {
  [BOARD_SIZE_SMALL]: [10, 8, 10],
  [BOARD_SIZE_MEDIUM]: [18, 14, 40],
  [BOARD_SIZE_LARGE]: [24, 20, 99],
};

export const gameBoard = createSlice({
  name: 'gameBoard',
  initialState: {
    size: BOARD_SIZE_SMALL,
    board: [],
    isGameOver: false,
    hasWon: false,
    bombCount: BoardSize[BOARD_SIZE_SMALL][2],
  },
  reducers: {
    resetBoard: (state) => {
      state.isGameOver = false;
      state.hasWon = false;
      state.bombCount = BoardSize[state.size][2];
      // state.board = this.createNewBoard(state.size);
      gameBoard.caseReducers.createNewBoard(state);
    },
    createNewBoard: (state) => {
      const [columns, rows, bombCount] = BoardSize[state.size];
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
            newRow.push({ val: -1, isOpen: false, isFlagged: false })
          } else { // not bomb index
            newRow.push({ val: 0, isOpen: false, isFlagged: false })
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
      state.board = newBoard;
    },
    changeSize: (state) => {
      if (state.size === BOARD_SIZE_SMALL) {
        state.size = BOARD_SIZE_MEDIUM;
      } else if (state.size === BOARD_SIZE_MEDIUM) {
        state.size = BOARD_SIZE_LARGE;
      } else if (state.size === BOARD_SIZE_LARGE) {
        state.size = BOARD_SIZE_SMALL;
      }
      gameBoard.caseReducers.resetBoard(state);
    },
    setFlag: (state, action) => {
      const { i, j } = action.payload;
      if (!state.board[i][j].isOpen && !state.board[i][j].isFlagged) {
        state.board[i][j].isFlagged = true;
      }
    },
    openBox: (state, action) => {
      const { i, j } = action.payload;
      const box = state.board[i][j];
      const [columns, rows] = BoardSize[state.size];

      const canOpen = (i, j) => {
        return !state.board[i][j].isOpen && !state.board[i][j].isFlagged;
      }

      if (box.isFlagged) {
        box.isFlagged = false;
      }

      if (!canOpen(i, j) || state.isGameOver) {
        return;
      }
      
      const checkPerimeter = (i, j) => {
        if (i - 1 >= 0 && canOpen(i - 1, j)) { // check top
          state.board[i - 1][j].isOpen = true;
          if (state.board[i - 1][j].val === 0) {
            checkPerimeter(i-1, j)
          }
        }
        if (i - 1 >= 0 && j + 1 < columns && canOpen(i-1, j+1)) { // check top right
          state.board[i - 1][j + 1].isOpen = true;
          if (state.board[i - 1][j + 1].val === 0) {
            checkPerimeter(i-1, j+1);
          }
        }
        if (j + 1 < columns && canOpen(i, j+1)) { // check right
          state.board[i][j + 1].isOpen = true;
          if (state.board[i][j + 1].val === 0) {
            checkPerimeter(i, j+1);
          }
        }
        if (i + 1 < rows && j + 1 < columns && canOpen(i+1, j+1)) { // check bottom right
          state.board[i + 1][j + 1].isOpen = true;
          if (state.board[i + 1][j + 1].val === 0) {
            checkPerimeter(i+1, j+1);
          }
        }
        if (i + 1 < rows && canOpen(i+1, j)) { // check bottom
          state.board[i + 1][j].isOpen = true;
          if (state.board[i + 1][j].val === 0) {
            checkPerimeter(i+1, j);
          }
        }
        if (i + 1 < rows && j - 1 >= 0 && canOpen(i+1, j-1)) { // check bottom left
          state.board[i + 1][j - 1].isOpen = true;
          if (state.board[i + 1][j - 1].val === 0) {
            checkPerimeter(i+1, j-1);
          }
        }
        if (j - 1 >= 0 && canOpen(i, j-1)) { // check left
          state.board[i][j - 1].isOpen = true;
          if (state.board[i][j - 1].val === 0) {
            checkPerimeter(i, j-1);
          }
        }
        if (i - 1 >= 0 && j - 1 >= 0 && canOpen(i-1, j-1)) {// check top left
          state.board[i - 1][j - 1].isOpen = true;
          if (state.board[i - 1][j - 1].val === 0) {
            checkPerimeter(i-1, j-1);
          }
        }
      };
  
      box.isOpen = true;
      if (box.val === 0) {
        checkPerimeter(i, j)
      } else if (box.val === -1) {
        state.isGameOver = true;
        gameBoard.caseReducers._seeAllBombs(state);
        return;
      }
      gameBoard.caseReducers._checkIfGameDone(state);
    },
    _seeAll: (state) => {
      const [columns, rows] = BoardSize[state.size];
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          state.board[i][j].isOpen = true;
        }
      }
      state.isGameOver = true;
    },
    _seeAllBombs: (state) => {
      const [columns, rows] = BoardSize[state.size];
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          if (state.board[i][j].val === -1) {
            state.board[i][j].isOpen = true;
          }
        }
      }
    },
    _checkIfGameDone: (state) => {
      const [columns, rows] = BoardSize[state.size];
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          if (state.board[i][j].val !== -1 && !state.board[i][j].isOpen) {
            return false;
          }
        }
      }
      state.isGameOver = true;
      state.hasWon = true;
      return true;
    }
  }
});

export const {
  resetBoard,
  createNewBoard,
  changeSize,
  setFlag,
  openBox,
  _seeAll,
} = gameBoard.actions;
export default gameBoard.reducer;
