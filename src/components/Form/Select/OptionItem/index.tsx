import { Fragment } from 'react';
import { Listbox } from '@headlessui/react';
import { styled } from 'stitches.config';
import { Option } from '../types';

interface OptionItemProps {
  option: Option;
}

function OptionItem({ option }: OptionItemProps) {
  return (
    <Listbox.Option as={Fragment} key={option.label} value={option}>
      {({ selected }) => (
        <SOptionItem selected={selected}>{option.label}</SOptionItem>
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
