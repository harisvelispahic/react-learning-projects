import { v4 as uuidv4 } from "uuid";
import { useState, memo, useCallback, useMemo } from "react";

import IconButton from "../UI/IconButton.jsx";
import MinusIcon from "../UI/Icons/MinusIcon.jsx";
import PlusIcon from "../UI/Icons/PlusIcon.jsx";
import CounterOutput from "./CounterOutput.jsx";
import CounterHistory from "./CounterHistory.jsx";
import { log } from "../../log.js";

function isPrime(number) {
  log("Calculating if is prime number", 2, "other");

  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

// memo prevents function executions that are triggered by the parent component
// it compares components using props, and if the props are unchanged, the component in which memo() was used will not rerender
// the Counter component will now only rerender when the props change OR the internal state changes

// it should be used as high up the component tree as possible
// it shouldn't be used in components where props change frequently

//
// After giving ConfigureCounter it's own component, we don't really need the memo function, but I'll leave it here

const Counter = memo(function ({ initialCount }) {
  log("<Counter /> rendered", 1);

  // useMemo will, just like memo, prevent the reexecution of a function, not a component like the memo() but a regular function
  // it will only reexecute if one of it's dependencies change (in the dependency array)
  // it will cache a value inside a variable/constant and not change it until it needs to
  // it is usually used for heavy, resource consuming operations, which don't need to be reevaluated on every component render
  const initialCountIsPrime = useMemo(() => isPrime(initialCount), [initialCount]);

  // const [counter, setCounter] = useState(initialCount);
  const [counterChanges, setCounterChanges] = useState([{ value: initialCount, id: uuidv4() }]);

  const currentCounter = counterChanges.reduce((prevCounter, counterChange) => prevCounter + counterChange.value, 0);

  const handleDecrement = useCallback(function handleDecrement() {
    // setCounter((prevCounter) => prevCounter - 1);
    setCounterChanges((prevCounterChanges) => [{ value: -1, id: uuidv4() }, ...prevCounterChanges]);
  }, []);

  const handleIncrement = useCallback(function handleIncrement() {
    // setCounter((prevCounter) => prevCounter + 1);
    setCounterChanges((prevCounterChanges) => [{ value: 1, id: uuidv4() }, ...prevCounterChanges]);
  }, []);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{" "}
        <strong>is {initialCountIsPrime ? "a" : "not a"}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={currentCounter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counterChanges} />
    </section>
  );
});

export default Counter;
