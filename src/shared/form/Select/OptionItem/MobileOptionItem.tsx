import { Listbox } from '@headlessui/react';
import SelectRadioItem from '@shared/filter/MultiSelect/SelectRadioItem';
import { CSSType } from 'stitches.config';

interface Option {
  label: string;
  // NOTE: null 은 placeholder
  value: string | null;
}

interface OptionItemProps {
  css?: CSSType;
  option: Option;
}

function MobileOptionItem({ css, option }: OptionItemProps) {
  return (
    <Listbox.Option key={option.label} value={option} style={{ display: 'flex', alignItems: 'center' }}>
      {({ selected }) => (
        <SelectRadioItem {...css} value={option.value || ''} label={option.label || ''} isChecked={selected} />
      )}
    </Listbox.Option>
  );
}

export default MobileOptionItem;
