import { useState } from 'react';
import MultiSelect from '@components/filter/MultiSelect';

export function useMultiSelect() {
  const [value, setValue] = useState<string[]>([]);
  const addValue = (e: string) => {
    if (!isContained(e)) {
      setValue(prev => [...prev, e]);
    }
  };
  const deleteValue = (e: string) => {
    const filteredValues = value.filter(value => value === e);
    setValue(filteredValues);
  };
  const isContained = (e: string) => value.includes(e);

  const toggle = (e: string) => {
    if (isContained(e)) {
      deleteValue(e);
    } else {
      addValue(e);
    }
  };
  const reset = () => setValue([]);
  return {
    value,
    setValue,
    addValue,
    deleteValue,
    isContained,
    toggle,
    reset,
    MultiSelect,
  };
}
