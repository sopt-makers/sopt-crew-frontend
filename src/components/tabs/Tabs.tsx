import { Box } from '@components/box/Box';
import React, { PropsWithChildren } from 'react';
import { styled } from 'stitches.config';
import { TabProps } from './Tab';
import { TabsContext } from './TabsContext';

interface TabsProps {
  text: string;
  size: string;
  onChange: (text: string) => void;
  children: React.ReactElement<TabProps>[];
}

function Tabs({
  text,
  size,
  onChange,
  children,
}: PropsWithChildren<TabsProps>) {
  return (
    <STabs
      css={{
        gap: size === 'small' ? '$32' : '$24',
      }}
    >
      <TabsContext.Provider value={{ text, size, onChange }}>
        {children}
      </TabsContext.Provider>
    </STabs>
  );
}

export default Tabs;

const STabs = styled(Box, {
  display: 'flex',
  cursor: 'pointer',
});
