import { useMemo } from 'react';
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
  stringifiedSelectedValue: string;
}

function MobileOptionItem({ css, option, stringifiedSelectedValue }: OptionItemProps) {
  const stringifiedValue = useMemo(() => JSON.stringify(option), [option]);

  return (
    <Listbox.Option key={option.label} value={stringifiedValue}>
      <SelectRadioItem
        {...css}
        value={option.value || ''}
        label={option.label || ''}
        isChecked={stringifiedSelectedValue === stringifiedValue}
      />
    </Listbox.Option>
  );
}

export default MobileOptionItem;
