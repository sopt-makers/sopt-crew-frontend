import { useState } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

function useSessionStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState(initialValue);

  useIsomorphicLayoutEffect(() => {
    setStoredValue(() => {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      try {
        const item = window.sessionStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        return initialValue;
      }
    });
  }, []);

  const setValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };
  return [storedValue, setValue];
}
export default useSessionStorage;
