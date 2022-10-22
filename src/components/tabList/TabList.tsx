import { Box } from '@components/box/Box';
import React, { PropsWithChildren } from 'react';
import { styled } from 'stitches.config';
import { TabListContext, useTabListContext } from './TabListContext';

interface TabListProps {
  text: string;
  size: string;
  onChange: (text: string) => void;
}

interface TabProps {
  text: string;
}

export function TabList({
  text,
  size,
  onChange,
  children,
}: PropsWithChildren<TabListProps>) {
  return (
    <STabList>
      <TabListContext.Provider value={{ text, size, onChange }}>
        {children}
      </TabListContext.Provider>
    </STabList>
  );
}

function TabItem({ text, children }: PropsWithChildren<TabProps>) {
  const { text: selectedTab, size, onChange } = useTabListContext();

  return (
    <STab
      isSelected={text === selectedTab}
      isSmall={size === 'small'}
      onClick={() => onChange(text)}
    >
      {children}
    </STab>
  );
}

TabList.Item = TabItem;

const STabList = styled(Box, {
  display: 'flex',
  cursor: 'pointer',
});

const STab = styled(Box, {
  '&:hover': {
    color: '$white',
  },
  variants: {
    isSelected: {
      true: {
        color: '$white',
        borderBottom: `4px solid $white`,
      },
      false: {
        color: '$gray100',
      },
    },
    isSmall: {
      true: {
        pb: '$24',
        fontAg: '24_semibold_100',
        paddingBottom: '$17',
        marginRight: '$32',
      },
      false: {
        pb: '$17',
        fontAg: '32_bold_100',
        paddingBottom: '$24',
        marginRight: '$24',
      },
    },
  },
});
