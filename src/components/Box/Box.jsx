import useForceUpdate from "../../helpers/forceUpdate";
import CurrentBoard from "../../helpers/board";

const BoxComponent = ({ box, i, j }) => {
  const { val, isOpen, isFlagged } = box;
  const forceUpdate = useForceUpdate();

  const handleOnClick = (e) => {
    e.preventDefault();
    if (e.nativeEvent.shiftKey) {// holding shift,
      CurrentBoard.setFlag(i, j);
    } else {
      CurrentBoard.openBox(i, j);
    }
    forceUpdate();
  };

  return(
    <div
      className={"box " + (isOpen && 'open num-' + val)}
      onClick={handleOnClick}
    >
      {isOpen && (val > 0) && val}
      {isOpen && val === -1 && '💣'}
      {isFlagged && '🚩'}
    </div>
  )
};

export default BoxComponent;
