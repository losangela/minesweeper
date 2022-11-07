import { useState } from "react";
import useForceUpdate from "../../helpers/forceUpdate";

const BoxComponent = ({ box }) => {
  const { val, isOpen, isFlagged } = box;
  const forceUpdate = useForceUpdate();
  const handleOnClick = (e) => {
    e.preventDefault();
    box.openBox();
    forceUpdate();
  };

  return(
    <div
      className={"box " + (isOpen && 'open')}
      onClick={handleOnClick}
    >
      {isOpen && val}
    </div>
  )
};

export default BoxComponent;
