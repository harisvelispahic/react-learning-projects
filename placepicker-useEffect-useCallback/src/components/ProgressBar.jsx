import { useState, useEffect } from "react";

const DURATION = 3000;

export default function ProgressBar({ ...props }) {
  const [remainingTime, setRemainingTime] = useState(DURATION);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("INTERVAL");
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);
    return () => {
      // interval will be stopped when the component dismounts (is removed from the DOM)
      // Cleanup function, as the name suggests, cleans up the "hanging" dependencies and ongoing processes in the background
      clearInterval(interval);
    };
  }, []);
  return <progress value={remainingTime} max={DURATION} />;
}
