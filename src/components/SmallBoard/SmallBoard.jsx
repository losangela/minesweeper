import { useSelector } from "react-redux";
import BoxComponent from "../Box/Box";

const SmallBoard = () => {
  const { board } = useSelector((state) => state.gameBoard);

  return(
    <div className="board-wrapper small">
      {board.map((row, i) => <div className="board-row" key={i}>
        {row.map((box, j) => <BoxComponent
          box={box}
          i={i}
          j={j}
          key={i.toString() + '-' + j.toString()}
        />)}
      </div>)}
    </div>
  )
};

export default SmallBoard;
