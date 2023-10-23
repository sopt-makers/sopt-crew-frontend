import { Fragment } from 'react';
import { Listbox } from '@headlessui/react';
import { styled } from 'stitches.config';
import CheckSelectedIcon from '@assets/svg/checkBox/selected.svg';
import CheckUnselectedIcon from '@assets/svg/checkBox/unselected.svg';

export interface Option {
  label: string;
  // NOTE: null 은 placeholder
  value: string | null;
}

interface CheckboxOptionItemProps {
  option: Option;
}

function CheckboxOptionItem({ option }: CheckboxOptionItemProps) {
  return (
    <Listbox.Option as={Fragment} key={option.label} value={option}>
      {({ selected }) => (
        <SCheckboxOptionItem>
          {selected ? <CheckSelectedIcon /> : <CheckUnselectedIcon />}
          <span>{option.label}</span>
        </SCheckboxOptionItem>
      )}
    </Listbox.Option>
  );
}

export default CheckboxOptionItem;

const SCheckboxOptionItem = styled('div', {
  minWidth: '147px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '16px',
  background: '$black40',
  color: '$gray10',
  fontAg: '16_medium_100',
});
