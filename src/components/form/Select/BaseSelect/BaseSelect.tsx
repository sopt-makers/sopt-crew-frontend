import { Listbox } from '@headlessui/react';
import Label from '@components/form/Label';
import Button from '../Button';
import OptionItem, { Option } from '../OptionItem';
import ErrorMessage from '../../ErrorMessage';
import { styled } from 'stitches.config';
import { MultipleSelectProps, SelectProps } from '../types/props';
import CheckboxOptionItem from '../OptionItem/CheckboxOptionItem';

export default function BaseSelect(props: SelectProps | MultipleSelectProps) {
  const { label, value, options, required, error, multiple, onChange, onBlur } = props;

  const handleChange = (newValue: typeof props['value']) => {
    if (multiple) {
      onChange(newValue as Option[]);
    } else {
      onChange(newValue as Option);
    }
  };
  const selectableOptions = options.filter(option => option.value);

  const buttonLabel = () => {
    if (multiple) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const selectedItems = value?.filter(v => v.value).sort((a, b) => a.order! - b.order!);
      if (!selectedItems?.length) return { text: value?.[0].label, active: false }; // return default value;

      const suffix = selectedItems && selectedItems.length > 1 ? ` 외 ${selectedItems.length - 1}` : '';
      return { text: `${selectedItems[0].label}${suffix}`, active: true };
    }
    return { text: value?.label, active: Boolean(value?.value) };
  };

  return (
    <>
      <Listbox value={value} onChange={handleChange} onBlur={onBlur} by="value" as="div" multiple={multiple}>
        {({ open }) => (
          <>
            {label && <Label required={required}>{label}</Label>}
            <Button label={buttonLabel()} open={open}></Button>

            <SOptionList>
              {selectableOptions.map(option =>
                multiple ? (
                  <CheckboxOptionItem key={option.value} option={option} />
                ) : (
                  <OptionItem key={option.value} option={option} css={{ minWidth: '147px' }} />
                )
              )}
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
