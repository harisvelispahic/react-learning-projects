import { useEffect, useRef, useContext } from "react";
import { createPortal } from "react-dom";

import { UserProgressContext } from "../../store/user-progress-context";

export default function Modal({ children, open, onClose, className = "" }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      dialog.current.showModal();
    }
    return () => modal.close();
  }, [open]);
  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.querySelector("#modal")
  );
}
