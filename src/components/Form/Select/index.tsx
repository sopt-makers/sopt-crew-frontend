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
              <OptionItem>{option.label}</OptionItem>
            </Listbox.Option>
          ))}
        </OptionList>
      </Listbox.Options>
    </Listbox>
  );
}

export default Select;

const Button = styled('button', {
  color: '$white',
});
const OptionList = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});
const OptionItem = styled('div', {
  border: '1px solid $white',
  cursor: 'pointer',
});
