import { Listbox } from '@headlessui/react';
import { CSSType } from 'stitches.config';
import SelectRadioItem from '@components/filter/MultiSelect/SelectRadioItem';

export interface Option {
  label: string;
  // NOTE: null 은 placeholder
  value: string | null;
}

interface OptionItemProps {
  css?: CSSType;
  option: Option;
  selectedValue?: Option;
}

function MobileOptionItem({ css, option, selectedValue }: OptionItemProps) {
  return (
    <Listbox.Option key={option.label} value={option}>
      <SelectRadioItem
        {...css}
        value={option.value || ''}
        label={option.label || ''}
        isChecked={selectedValue?.value === option.value}
      />
    </Listbox.Option>
  );
}

export default MobileOptionItem;
