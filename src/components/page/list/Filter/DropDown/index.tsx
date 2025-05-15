import { ampli } from '@/ampli';
import { FilterType } from '@constants/option';
import { useMultiQueryString } from '@hooks/queryString';
import useDebounce from '@hooks/useDebounce';
import { SelectV2 } from '@sopt-makers/ui';
import { css } from '@stitches/react';
import { useEffect, useMemo, useState } from 'react';
import { styled } from 'stitches.config';

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
  const { subject, options, label } = filter as { subject: string; options: string[]; label: string };
  const { value: selectedValue, setValue, deleteKey } = useMultiQueryString(subject);
  const selectedValueArray = useMemo(() => selectedValue || [], [selectedValue]);
  const [rawSelected, setRawSelected] = useState<string>('');
  const debounceValue = useDebounce(rawSelected, 1300);

  const defaultValue = useMemo(
    () => selectedValueArray.map((opt: string) => ({ label: opt, value: opt })),
    [selectedValueArray]
  );

  const getResolvedLabel = () => {
    const selected = rawSelected ? rawSelected.split(',') : selectedValueArray;
    if (selected.length === 0) return label;
    if (selected.length === 1) return selected[0];
    return label;
  };

  const setPartQuery = (value: string | string[]) => {
    const values = typeof value === 'string' ? [value] : value;
    if (!values || values.length === 0) {
      setRawSelected('');
      return deleteKey();
    }
    setRawSelected(values.join(','));
  };

  useEffect(() => {
    if (debounceValue) setValue(debounceValue.split(','));
    ampli.clickFilterPart({ group_part: debounceValue });
  }, [debounceValue]);

  return (
    <SDropDownContainer>
      <SelectV2.Root type="text" visibleOptions={6} defaultValue={defaultValue} onChange={setPartQuery} multiple={true}>
        <SelectV2.Trigger>
          <SelectV2.TriggerContent className={getAutoClass(width)()} placeholder={label} label={getResolvedLabel()} />
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
