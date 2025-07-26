import { useRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

export default function ResultModal({
  ref,
  targetTime,
  remainingTime,
  onReset,
}) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      // arbitrary name for the function to open the dialog
      // this function can be called from the parent component to expose the dialog functionality, detaching it from the parent component, allowing all changes to be made in this component
      open() {
        dialog.current.showModal();
      },
    };
  });

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      <h2>{userLost ? "You lost" : `Your score: ${score}`}</h2>
      <p>
        The target time was{" "}
        <strong>
          {targetTime} second{targetTime === 1 ? "" : "s"}.
        </strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>
          {formattedRemainingTime} second{targetTime === 1 ? "s" : ""} left.
        </strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.querySelector("#modal")
  );
}
