import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    // console.log("Timer started");
    const timer = setTimeout(() => {
      // console.log("Timer stopped");
      onTimeout();
      setRemainingTime(timeout);
    }, timeout);

    return () => {
      // console.log("Timer cleared");
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("INTERVAL");
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      // console.log("INTERVAL CLEARED");
      clearInterval(interval);
    };
  }, []);

  return <progress id="question-time" value={remainingTime} max={timeout} className={mode}/>;
}
