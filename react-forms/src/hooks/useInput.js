import { useState } from "react";

export function useInput(validationFn, defaultvalue = "") {
  const [enteredValue, setEnteredValue] = useState(defaultvalue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue);

  function handleInputChange(event) {
    setEnteredValue(event.target.value);
  }

  function handleInputBlur() {
    setDidEdit(true);
  }

  function handleInputFocus() {
    setDidEdit(false);
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    handleInputFocus,
    hasError: didEdit && !valueIsValid,
  };
}
