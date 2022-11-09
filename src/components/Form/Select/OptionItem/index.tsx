import { Fragment } from 'react';
import { Listbox } from '@headlessui/react';
import { styled } from 'stitches.config';

export interface Option {
  label: string;
  // NOTE: null 은 placeholder
  value: string | null;
}

interface OptionItemProps {
  option: Option;
  type: 'invitation' | 'make';
}

function OptionItem({ option, type }: OptionItemProps) {
  return (
    <Listbox.Option as={Fragment} key={option.label} value={option}>
      {({ selected }) => (
        <SOptionItem selected={selected} type={type}>
          {option.label}
        </SOptionItem>
      )}
    </Listbox.Option>
  );
}

export default OptionItem;

const SOptionItem = styled('div', {
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  padding: '12px 16px',
  fontAg: '18_medium_100',
  variants: {
    selected: {
      true: {
        fontAg: '18_bold_100',
        color: '$purple100',
      },
    },
    type: {
      invitation: {
        background: '$black100',
      },
      make: {
        background: '$black40',
      },
    },
  },
});
