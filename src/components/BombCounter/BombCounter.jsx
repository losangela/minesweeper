import { useSelector } from "react-redux";

const BombCounter = () => {
  const { bombCount, flagCount } = useSelector(state => state.gameBoard);

  return(
    <div className="bomb-counter-wrapper">
      <div className="flex-1">🚩</div>
      <div className="flex-1">{bombCount - flagCount}</div>
    </div>
  )
};

export default BombCounter;