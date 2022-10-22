import { Fragment } from 'react';
import { Listbox } from '@headlessui/react';
import { styled } from 'stitches.config';
import Label from '@components/Form/Label';

export interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  value: Option;
  options: Option[];
  required?: boolean;
  onChange: (value: Option) => void;
}

function Select({ label, value, options, required, onChange }: SelectProps) {
  return (
    <Listbox value={value} onChange={onChange}>
      {label && <Label required={required}>{label}</Label>}
      <Listbox.Button as="div">
        <Button>{value.label}</Button>
      </Listbox.Button>

      <Listbox.Options as={Fragment}>
        <OptionList>
          {options.map(option => (
            <Listbox.Option as={Fragment} key={option.label} value={option}>
              {({ selected }) => (
                <OptionItem selected={selected}>{option.label}</OptionItem>
              )}
            </Listbox.Option>
          ))}
        </OptionList>
      </Listbox.Options>
    </Listbox>
  );
}

export default Select;

const Button = styled('button', {
  padding: '16px 20px 16px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  color: '$white',
  background: '$black40',
  borderRadius: 10,
});
const OptionList = styled('ul', {
  padding: '8px 0px',
  display: 'flex',
  flexDirection: 'column',
  background: '$black40',
  border: '1px solid $black40',
  borderRadius: 10,
});
const OptionItem = styled('div', {
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
