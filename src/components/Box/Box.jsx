import { useDispatch, useSelector } from "react-redux";
import { openBox, setFlag, _populateBombs } from "../../store/gameBoard";

const BoxComponent = ({ i, j }) => {
  const { isGameOver, board, hasBombs } = useSelector((state) => state.gameBoard);
  const { val, isOpen, isFlagged } = board[i][j];
  const dispatch = useDispatch();

  const handleOnClick = (e) => {
    e.preventDefault();
    if (e.nativeEvent.shiftKey) {// holding shift,
      dispatch(setFlag({i, j}));
    } else {
      if (!hasBombs) {
        dispatch(_populateBombs({i, j}))
      }
      dispatch(openBox({i, j}));
    }
  };

  return(
    <div
      className={(isGameOver ? "box done " : "box " )+ (isOpen && 'open num-' + val)}
      onClick={handleOnClick}
    >
      {isOpen && (val > 0) && val}
      {isOpen && val === -1 && '💣'}
      {isFlagged && '🚩'}
    </div>
  )
};

export default BoxComponent;
