import { configureStore } from '@reduxjs/toolkit'
import gameBoard from './gameBoard';

export default configureStore({
  reducer: {
    gameBoard,
  },
})