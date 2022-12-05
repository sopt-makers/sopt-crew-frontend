import { createContext, useContext } from 'react';

interface TabListContextProps {
  text: string;
  size: string;
  onChange: (text: string) => void;
}

export const TabListContext = createContext<TabListContextProps>({
  text: '',
  size: '',
  onChange: () => ({}),
});

export const useTabListContext = () => {
  return useContext(TabListContext);
};
