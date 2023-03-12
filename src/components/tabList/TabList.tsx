import { PropsWithChildren } from 'react';
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
  return (
    <STabList>
      <TabListContext.Provider value={{ text, size, onChange: onChange ? onChange : () => {} }}>
        {children}
      </TabListContext.Provider>
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

  '@mobile': {
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
        mr: '$32',

        '@mobile': {
          fontAg: '16_bold_100',
          paddingBottom: '$10',
          mr: '$16',
          minWidth: 'fit-content',

          '&:last-child': {
            mr: '$0',
          },
        },
      },

      false: {
        pb: '$17',
        fontAg: '32_bold_100',
        paddingBottom: '$24',
        mr: '$24',

        '@mobile': {
          fontAg: '20_bold_100',
          paddingBottom: '$8',
          mr: '$16',
        },
      },
    },
  },
});
