import { ampli } from '@/ampli';
import { ACTIVE_GENERATION } from '@constant/activeGeneration';
import { FilterType } from '@constant/option';
import { useMultiQueryString } from '@hook/queryString';
import useDebounce from '@hook/useDebounce';
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
  const { subject, options, label } = filter;
  const { value: selectedValue, setValue, deleteKey } = useMultiQueryString(subject);
  const [rawSelected, setRawSelected] = useState<string[]>([]);
  const debounceValue = useDebounce(rawSelected, 800);
  const defaultValue = useMemo(() => selectedValue.map((opt: string) => ({ label: opt, value: opt })), [selectedValue]);

  const resolvedLabel = useMemo(() => {
    const selected = rawSelected.length > 0 ? rawSelected : selectedValue;
    // 단일 선택시 label 은 유저가 선택한 값
    if (selected.length === 1) return selected[0];
    // 다중 선택 시 label 은 필터라벨
    else return label;
  }, [label, rawSelected, selectedValue]);

  const setPartQuery = (value: string | string[]) => {
    const values = typeof value === 'string' ? [value] : value;
    if (values.length === 0) {
      setRawSelected([]);
      return deleteKey();
    }
    setRawSelected(values);
    handleAmpliLog(values);
  };

  const handleAmpliLog = (value: string[]) => {
    const joined = value.join(',');

    switch (subject) {
      case 'category':
        ampli.applyMultiplefilter({ 'Applied-category': joined });
        break;
      case 'status':
        ampli.applyMultiplefilter({ 'Applied-status': joined });
        break;
      case 'part':
        ampli.applyMultiplefilter({ 'Applied-part': joined });
        break;
      case 'keyword':
        ampli.applyMultiplefilter({ 'Applied-keyword': joined });
        break;
      case 'isOnlyActiveGeneration':
        ampli.applyMultiplefilter({ 'Applied-generation': joined === `${ACTIVE_GENERATION}기만` });
        break;
    }
  };

  useEffect(() => {
    if (debounceValue && rawSelected?.length > 0) {
      setValue(debounceValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  return (
    <SDropDownContainer>
      <SelectV2.Root type="text" visibleOptions={6} defaultValue={defaultValue} onChange={setPartQuery} multiple={true}>
        <SelectV2.Trigger>
          <SelectV2.TriggerContent className={getAutoClass(width)()} placeholder={label} label={resolvedLabel} />
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
