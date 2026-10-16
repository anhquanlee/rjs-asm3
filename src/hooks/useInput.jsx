import { useState } from 'react';

export function useInput(initialValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(initialValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue);

  function handleInputChange(event) {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  }

  function handleInputBlur() {
    setDidEdit(true);
  }

  function reset() {
    setEnteredValue(initialValue);
    setDidEdit(false);
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid,
    isValid: valueIsValid,
    reset,
  };
}
