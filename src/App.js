import './App.css';
import SmallBoard from './components/SmallBoard/SmallBoard';
import board from './helpers/board';
import useForceUpdate from './helpers/forceUpdate';

function App() {
  const forceUpdate = useForceUpdate();
  return (
    <div className="App">
      <h1>Minesweeper</h1>
      <div className="row">
        <button onClick={() => {
          board.reset();
          forceUpdate();
        }}>new</button>
      </div>
      <SmallBoard />
    </div>
  );
}

export default App;
