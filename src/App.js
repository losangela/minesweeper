import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import SmallBoard from './components/SmallBoard/SmallBoard';
import {
  BOARD_SIZE_LARGE,
  BOARD_SIZE_MEDIUM,
  BOARD_SIZE_SMALL,
  changeSize,
  resetBoard,
} from './store/gameBoard';

function App() {
  const { isGameOver, size: boardSize, hasWon } = useSelector((state) => state.gameBoard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetBoard())
  }, []);
  
  return (
    <div className="App">
      <h1>Minesweeper</h1>
      <h3>{(isGameOver && !hasWon) ? 'Game Over!' : (isGameOver && hasWon) ? '🎉 CONGRATULATIONS!!! 🎉' : 'Let\'s play!'}</h3>
      <div className="row">
        <button onClick={() => dispatch(resetBoard())}>New Game</button>
        {/* <button onClick={() => dispatch(_seeAll())}>reveal</button> */}
        {/* <button onClick={() => {
          forceUpdate();
        }}>refresh</button> */}
        {/* <button onClick={() => dispatch(changeSize())}>{boardSize}</button> */}
        <select value={boardSize} onChange={(e) => dispatch(changeSize({ size: e.target.value }))}>
          <option value={BOARD_SIZE_SMALL}>Small</option>
          <option value={BOARD_SIZE_MEDIUM}>Medium</option>
          <option value={BOARD_SIZE_LARGE}>Large</option>
        </select>
      </div>
      <SmallBoard />
    </div>
  );
}

export default App;
