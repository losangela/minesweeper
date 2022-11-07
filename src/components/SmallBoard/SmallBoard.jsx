import board from "../../helpers/board";
import BoxComponent from "../Box/Box";

const SmallBoard = () => {
  return(
    <div className="board-wrapper small">
      {board.board.map(row => <div className="board-row">
        {row.map(box => <BoxComponent />)}
      </div>)}
    </div>
  )
};

export default SmallBoard;
