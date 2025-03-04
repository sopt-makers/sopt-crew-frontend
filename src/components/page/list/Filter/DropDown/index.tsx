import { ampli } from '@/ampli';
import { FilterType } from '@constants/option';
import { useQueryString } from '@hooks/queryString';
import { IconXCircle } from '@sopt-makers/icons';
import { SelectV2 } from '@sopt-makers/ui';
import { css } from '@stitches/react';
import { useRouter } from 'next/router';
import React from 'react';
import { styled } from 'stitches.config';

interface DropDownFilterProps {
  filter: FilterType;
}

//notice: 현재 클래스 제대로 적용안되는 문제점으로 인해 !important 사용 필요
const autoClass = css({
  width: '120px !important',
  whiteSpace: 'nowrap',
});

function DropDownFilter({ filter }: DropDownFilterProps) {
  const { subject, options, label } = filter;
  const { value: selectedValue, setValue, deleteKey } = useQueryString(subject);

  const router = useRouter();
  const selectedPartQuery = router.query[subject] as string;

  const isActiveGeneration = subject === 'isOnlyActiveGeneration' && selectedPartQuery === 'true';
  const defaultValue = isActiveGeneration
    ? { label: '36기', value: '36기' }
    : selectedPartQuery
    ? { label: selectedPartQuery, value: selectedPartQuery }
    : undefined;

  const setPartQuery = (value: string | null) => {
    if (value === null) {
      return deleteKey();
    }

    //notice: 활동 기수 드롭다운의 경우, 특별 처리
    if (subject === 'isOnlyActiveGeneration' && value === '36기') {
      if (selectedValue) return deleteKey();
      setValue('true');
      ampli.clickFilterGeneration({ group_generation: true });
      return;
    }

    ampli.clickFilterPart({ group_part: value });

    if (selectedValue === value) return deleteKey();
    return setValue(value);
  };

  return (
    <SDropDownContainer>
      <SelectV2.Root type="text" visibleOptions={6} defaultValue={defaultValue} onChange={setPartQuery}>
        <SelectV2.Trigger>
          <SelectV2.TriggerContent
            className={autoClass()}
            placeholder={label}
            icon={
              defaultValue ? (
                <IconXCircle
                  style={{ width: '20px', height: '20px', fill: 'white', color: 'black' }}
                  onClick={e => {
                    e.stopPropagation();
                    setPartQuery(null);
                  }}
                />
              ) : null
            }
          />
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
