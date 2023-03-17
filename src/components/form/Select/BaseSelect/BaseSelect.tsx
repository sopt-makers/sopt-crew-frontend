import { Listbox } from '@headlessui/react';
import Label from '@components/form/Label';
import Button from '../Button';
import OptionItem, { Option } from '../OptionItem';
import ErrorMessage from '../../ErrorMessage';
import { styled } from 'stitches.config';
import { SelectProps } from '../types/props';

export default function BaseSelect(props: SelectProps) {
  const { label, value, options, required, error, onChange, onBlur } = props;
  const handleChange = (newValue: Option) => {
    onChange(newValue);
  };
  const selectableOptions = options.filter(option => option.value);

  return (
    <>
      <Listbox value={value} onChange={handleChange} onBlur={onBlur} as="div">
        {({ open }) => (
          <>
            {label && <Label required={required}>{label}</Label>}
            <Button value={value} open={open} />
            <SOptionList>
              {selectableOptions.map(option => (
                <OptionItem key={option.value} option={option} css={{ minWidth: '147px' }} selectedValue={value} />
              ))}
            </SOptionList>
          </>
        )}
      </Listbox>
      {error && <SErrorMessage>{error}</SErrorMessage>}
    </>
  );
}
const SOptionList = styled(Listbox.Options, {
  position: 'absolute',
  maxHeight: '300px',
  padding: '8px 0px',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid $black40',
  borderRadius: 10,
  mt: '$8',
  background: '$black40',
  overflow: 'auto',
  zIndex: 100,
  '@mobile': {
    display: 'none',
  },
});
const SErrorMessage = styled(ErrorMessage, {
  marginTop: '12px',
});
