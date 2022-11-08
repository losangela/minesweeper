import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import SmallBoard from './components/SmallBoard/SmallBoard';
import { changeSize, resetBoard, _seeAll } from './store/gameBoard';

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
        <button onClick={() => dispatch(resetBoard())}>new</button>
        <button onClick={() => dispatch(_seeAll())}>reveal</button>
        {/* <button onClick={() => {
          forceUpdate();
        }}>refresh</button> */}
        <button onClick={() => dispatch(changeSize())}>{boardSize}</button>
      </div>
      <SmallBoard />
    </div>
  );
}

export default App;
