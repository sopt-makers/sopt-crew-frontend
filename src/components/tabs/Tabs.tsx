import React from 'react';
import { TabProps } from './Tab';

interface TabsProps {
  text: string;
  onChange: (text: string) => void;
  children: React.ReactElement<TabProps>[];
}

interface TabsContextProps {
  text: string;
  onChange: (text: string) => void;
}

const TabsContext = React.createContext<TabsContextProps>({
  text: '',
  onChange: () => {},
});
export const useTabsContext = () => {
  return React.useContext(TabsContext);
};

function Tabs(props: TabsProps) {
  const { text, onChange, children } = props;
  return (
    <TabsContext.Provider value={{ text, onChange }}>
      {children}
    </TabsContext.Provider>
  );
}

export default Tabs;
