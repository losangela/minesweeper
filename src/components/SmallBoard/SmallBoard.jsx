import board from "../../helpers/board";
import BoxComponent from "../Box/Box";

const SmallBoard = () => {
  return(
    <div className="board-wrapper small">
      {board.board.map((row, i) => <div className="board-row" key={i}>
        {row.map((box, j) => <BoxComponent
          box={box}
          key={i.toString() + '-' + j.toString()}
        />)}
      </div>)}
    </div>
  )
};

export default SmallBoard;
