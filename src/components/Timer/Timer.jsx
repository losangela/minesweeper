import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Timer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const { hasBombs, isGameOver } = useSelector((state) => state.gameBoard);

  useEffect(() => {
    if (!hasBombs && !isGameOver) {// reset timer
      setSecondsElapsed(0);
      setIsRunning(false);
    }
    if (hasBombs && !isGameOver && !isRunning) {// game starts when it has bombs
      setSecondsElapsed(0);
      setIsRunning(true);
    } else if (hasBombs && isGameOver && isRunning) { // game over
      setIsRunning(false);
    }
  }, [hasBombs, isGameOver, isRunning]);

  useEffect(() => {// not sure what's happening. Seems to set & clear new interval each second..
    let intervalId = null;
    if (isRunning) {
      intervalId = setInterval(() => {
        setSecondsElapsed((secondsElapsed) => secondsElapsed + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => {
      clearInterval(intervalId);
    }
  }, [isRunning]);

  return(
    <div className="timer-wrapper">
      <div className="flex-1">
        ⌛
      </div>
      <div className="flex-1">
        {secondsElapsed - 1000 > 0 ? ("000" + secondsElapsed).slice(-4) : ("00" + secondsElapsed).slice(-3)}
      </div>
    </div>
  )
};

export default Timer;
