import { useState } from 'react';
import MultiSelect from '@components/filter/MultiSelect';

export function useMultiSelect() {
  const [values, setValues] = useState<string[]>([]);
  const addValue = (inputValue: string) => {
    if (!isContained(inputValue)) {
      setValues(prev => [...prev, inputValue]);
    }
  };
  const deleteValue = (inputValue: string) => {
    const filteredValues = values.filter(value => value === inputValue);
    setValues(filteredValues);
  };
  const isContained = (inputValue: string) => values.includes(inputValue);

  const toggle = (inputValue: string) => {
    if (isContained(inputValue)) {
      deleteValue(inputValue);
    } else {
      addValue(inputValue);
    }
  };
  const reset = () => setValues([]);
  return {
    values,
    setValues,
    addValue,
    deleteValue,
    isContained,
    toggle,
    reset,
    MultiSelect,
  };
}
