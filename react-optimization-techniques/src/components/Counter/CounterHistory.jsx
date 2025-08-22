import { useState } from "react";

import { log } from "../../log.js";

function HistoryItem({ count }) {
  log("<HistoryItem /> rendered", 3);

  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected((prevSelected) => !prevSelected);
  }

  return (
    <li onClick={handleClick} className={selected ? "selected" : undefined}>
      {count}
    </li>
  );
}

export default function CounterHistory({ history }) {
  log("<CounterHistory /> rendered", 2);

  return (
    <ol>
      {history.map((count) => (
        // In react, state is tracked by component type and position. However we can add the key prop to firmly bind the state to the specific component instance
        <HistoryItem key={count.id} count={count.value} />
      ))}
    </ol>
  );
}
