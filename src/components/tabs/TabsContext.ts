import React, { createContext } from 'react';

interface TabsContextProps {
  text: string;
  size: string;
  onChange: (text: string) => void;
}

export const TabsContext = createContext<TabsContextProps>({
  text: '',
  size: '',
  onChange: () => {},
});

export const useTabsContext = () => {
  return React.useContext(TabsContext);
};
