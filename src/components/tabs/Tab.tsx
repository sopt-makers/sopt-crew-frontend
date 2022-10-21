import { Box } from '@components/box/Box';
import { PropsWithChildren } from 'react';
import { styled } from 'stitches.config';
import { useTabsContext } from './Tabs';

export interface TabProps {
  text: string;
}

function Tab({ text, children }: PropsWithChildren<TabProps>) {
  const { text: selectedTab, onChange } = useTabsContext();

  return (
    <STab isSelected={text === selectedTab} onClick={() => onChange(text)}>
      {children}
    </STab>
  );
}

export default Tab;

const STab = styled(Box, {
  variants: {
    isSelected: {
      true: {
        color: '$white',
      },
      false: {
        color: '$gray100',
      },
    },
  },
});
