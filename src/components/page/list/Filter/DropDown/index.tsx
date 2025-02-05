import { ampli } from '@/ampli';
import { FilterType } from '@constants/option';
import { useQueryString } from '@hooks/queryString';
import { SelectV2 } from '@sopt-makers/ui';
import { useRouter } from 'next/router';
import React from 'react';
import { styled } from 'stitches.config';

interface DropDownFilterProps {
  filter: FilterType;
}

function DropDownFilter({ filter }: DropDownFilterProps) {
  const router = useRouter();
  const selectedPartQuery = router.query.part as string;
  const defaultValue = selectedPartQuery ? { label: selectedPartQuery, value: selectedPartQuery } : undefined;

  const { subject, options } = filter;
  const { value: selectedValue, setValue, deleteKey } = useQueryString(subject);

  const setPartQuery = (value: string) => {
    ampli.clickFilterPart({ group_part: value });

    if (selectedValue === value) return deleteKey();
    return setValue(value);
  };

  return (
    <SDropDownContainer>
      <SelectV2.Root type="text" visibleOptions={6} defaultValue={defaultValue} onChange={setPartQuery}>
        <SelectV2.Trigger>
          <SelectV2.TriggerContent placeholder={'대상 파트'} />
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
  ml: '$16',
});
