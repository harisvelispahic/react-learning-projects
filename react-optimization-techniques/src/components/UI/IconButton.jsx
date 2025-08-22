import { memo } from "react";
import { log } from "../../log.js";

/* If the million-js is unable to optimize a component for whatever reason, and we want to exclude it from optimization we can just comment "million-ignore" */
const IconButton = memo(function IconButton({ children, icon, ...props }) {
  log("<IconButton /> rendered", 2);

  const Icon = icon;
  return (
    <button {...props} className="button">
      <Icon className="button-icon" />
      <span className="button-text">{children}</span>
    </button>
  );
});

export default IconButton;
