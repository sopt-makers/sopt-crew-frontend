import { ampli } from '@/ampli';
import { FilterType } from '@constants/option';
import { useQueryString } from '@hooks/queryString';
import { SelectV2 } from '@sopt-makers/ui';
import { css } from '@stitches/react';
import React, { useEffect, useState } from 'react';
import { styled } from 'stitches.config';
import useDebounce from '@hooks/useDebounce';

interface DropDownFilterProps {
  filter: FilterType;
  width?: string;
}

//notice: 현재 클래스 제대로 적용안되는 문제점으로 인해 !important 사용 필요
const getAutoClass = (width?: string) =>
  css({
    minWidth: `${width ?? '140px'} !important`,
    width: `${width ?? '140px'} !important`,
    whiteSpace: 'nowrap',
  });

function DropDownFilter({ filter, width }: DropDownFilterProps) {
  const { subject, options, label } = filter;
  const { value: selectedValue, setValue, deleteKey } = useQueryString(subject);
  const selectedValueArray = selectedValue ? selectedValue.split(',') : [];
  const [filterLabel, setFilterLabel] = useState<string | undefined>(
    selectedValueArray.length > 1 ? label : selectedValueArray[0] ?? label
  );
  const [rawSelected, setRawSelected] = useState<string>('');
  const debounceValue = useDebounce(rawSelected, 1300);

  const defaultValue = selectedValue ? selectedValue.split(',').map(opt => ({ label: opt, value: opt })) : [];

  const setPartQuery = (value: string | string[]) => {
    const values = typeof value === 'string' ? [value] : value;
    if (!values || values.length === 0) {
      setRawSelected('');
      return deleteKey();
    }

    /* 단일 선택 시 label에 선택한 값 세팅 */
    if (values.length == 1) {
      setFilterLabel(values[0]);
    } else {
      setFilterLabel(label);
    }

    const newValue = values.join(',');
    setRawSelected(newValue);
  };

  useEffect(() => {
    if (debounceValue) setValue(debounceValue);
    ampli.clickFilterPart({ group_part: debounceValue });
  }, [debounceValue]);

  return (
    <SDropDownContainer>
      <SelectV2.Root type="text" visibleOptions={6} defaultValue={defaultValue} onChange={setPartQuery} multiple={true}>
        <SelectV2.Trigger>
          <SelectV2.TriggerContent className={getAutoClass(width)()} placeholder={filterLabel} label={filterLabel} />
        </SelectV2.Trigger>
        <SelectV2.Menu>
          {options.map(option => (
            <SelectV2.MenuItem key={option} option={{ label: option, value: option }} />
          ))}
        </SelectV2.Menu>
      </SelectV2.Root>
    </SDropDownContainer>
  );
}

export default DropDownFilter;

const SDropDownContainer = styled('div', {
  mr: '$10',
});
