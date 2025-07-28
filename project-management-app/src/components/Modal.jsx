import { createPortal } from "react-dom";
import { useRef, useImperativeHandle } from "react";
import Button from "./Button";

export default function Modal({ children, ref, buttonText }) {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{buttonText}</Button>
      </form>
    </dialog>,
    document.querySelector("#modal-root")
  );
}
