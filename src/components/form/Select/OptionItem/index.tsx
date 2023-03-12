import { Fragment, useMemo } from 'react';
import { Listbox } from '@headlessui/react';
import { CSSType, styled } from 'stitches.config';
import { Box } from '@components/box/Box';

export interface Option {
  label: string;
  // NOTE: null 은 placeholder
  value: string | null;
}

interface OptionItemProps {
  css?: CSSType;
  option: Option;
}

function OptionItem({ css, option }: OptionItemProps) {
  const stringifiedValue = useMemo(() => JSON.stringify(option), [option]);
  return (
    <Listbox.Option as={Fragment} key={option.label} value={stringifiedValue}>
      {({ selected }) => (
        <SOptionItem css={{ ...css }} selected={selected}>
          {option.label}
        </SOptionItem>
      )}
    </Listbox.Option>
  );
}

export default OptionItem;

const SOptionItem = styled(Box, {
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  padding: '12px 16px',
  background: '$black40',
  fontAg: '18_medium_100',
  variants: {
    selected: {
      true: {
        fontAg: '18_bold_100',
        color: '$purple100',
      },
    },
  },
});
