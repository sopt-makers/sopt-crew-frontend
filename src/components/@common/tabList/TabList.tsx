import { PropsWithChildren, useMemo } from 'react';
import { styled } from 'stitches.config';
import { TabListContext, useTabListContext } from './TabListContext';

interface TabListProps {
  text: string;
  size: string;
  onChange?: (text: string) => void;
}

interface TabProps {
  text: string;
}

export function TabList({ text, size, onChange, children }: PropsWithChildren<TabListProps>) {
  const tabListContextValue = useMemo(
    () => ({
      text,
      size,
      onChange: onChange ? onChange : () => {},
    }),
    [text, size, onChange]
  );
  return (
    <STabList>
      <TabListContext.Provider value={tabListContextValue}>{children}</TabListContext.Provider>
    </STabList>
  );
}

function TabItem({ text, children }: PropsWithChildren<TabProps>) {
  const { text: selectedTab, size, onChange } = useTabListContext();

  return (
    <STab isSelected={text === selectedTab} isSmall={size === 'small'} onClick={() => onChange(text)}>
      {children}
    </STab>
  );
}

TabList.Item = TabItem;

const STabList = styled('ul', {
  display: 'flex',

  '@media (max-width: 768px)': {
    overflowX: 'scroll',
    '-ms-overflow-style': 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

const STab = styled('li', {
  cursor: 'pointer',
  borderBottom: '2px solid transparent',
  '&:hover': {
    color: '$gray10',
  },

  variants: {
    isSelected: {
      true: {
        color: '$gray10',
        borderColor: `$gray200`,
      },
      false: {
        color: '$gray500',
      },
    },

    isSmall: {
      true: {
        pb: '$24',
        fontAg: '24_semibold_100',
        paddingBottom: '$17',
        mr: '$32',

        '@media (max-width: 768px)': {
          fontAg: '16_bold_100',
          padding: '$16 $8',
          mr: '$8',
          minWidth: 'fit-content',

          '&:last-child': {
            mr: '$0',
          },
        },
      },

      false: {
        pb: '$16',
        mr: '$20',
        fontStyle: 'H1',

        '@media (max-width: 768px)': {
          fontStyle: 'T3',
          pb: '$6',
          mr: '$12',
        },
      },
    },
  },
});
