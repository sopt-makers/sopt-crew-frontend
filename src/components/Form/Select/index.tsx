import { FocusEventHandler, Fragment } from 'react';
import { Listbox } from '@headlessui/react';
import { styled } from 'stitches.config';
import Label from '@components/Form/Label';
import Button from './Button';
import OptionItem, { Option } from './OptionItem';
import { Box } from '@components/box/Box';

interface SelectProps {
  label?: string;
  value?: Option;
  options: Option[];
  required?: boolean;
  onChange: (value: Option) => void;
  onBlur?: FocusEventHandler<HTMLDivElement>;
  type: 'invitation' | 'make';
}

function Select({
  label,
  value,
  options,
  required,
  onChange,
  onBlur,
  type,
}: SelectProps) {
  return (
    <Listbox value={value} onChange={onChange} onBlur={onBlur} as="div">
      {({ open }) => (
        <>
          {label && <Label required={required}>{label}</Label>}
          <Button value={value} open={open} type={type} />

          <Listbox.Options as={Fragment}>
            <SOptionList type={type}>
              {options
                // NOTE: value가 null 이면 placeholder 전용 옵션. 이는 제거하고 목록을 보여주자.
                .filter(option => option.value)
                .map(option => (
                  <OptionItem key={option.value} option={option} type={type} />
                ))}
            </SOptionList>
          </Listbox.Options>
        </>
      )}
    </Listbox>
  );
}

export default Select;

const SOptionList = styled('ul', {
  padding: '8px 0px',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid $black40',
  borderRadius: 10,
  mt: '$8',

  variants: {
    type: {
      invitation: {
        background: '$black100',
        position: 'absolute',
        top: '$50',
      },
      make: {
        background: '$black40',
      },
    },
  },
});
