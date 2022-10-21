import { Box } from '@components/box/Box';
import { PropsWithChildren } from 'react';
import { styled } from 'stitches.config';
import { useTabsContext } from './Tabs';

export interface TabProps {
  text: string;
}

function Tab({ text, children }: PropsWithChildren<TabProps>) {
  const { text: selectedTab, size, onChange } = useTabsContext();

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

export default Tab;

const STab = styled(Box, {
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
      },
      false: {
        pb: '$17',
        fontAg: '32_bold_100',
        paddingBottom: '$24',
      },
    },
  },
});
