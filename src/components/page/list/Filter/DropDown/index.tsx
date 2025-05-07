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

  // 'category', [카테고리에 대한 옵션], '카테고리'
  // console.log(subject, options, label);

  const { value: selectedValue, setValue, deleteKey } = useQueryString(subject);

  console.log(selectedValue);

  // const router = useRouter();
  // const selectedPartQuery = router.query[subject] as string;
  //
  // const isActiveGeneration = subject === 'isOnlyActiveGeneration' && selectedPartQuery === 'true';
  const defaultValue = selectedValue
    ? selectedValue.split(',').map(opt => ({ label: opt, value: opt }))
    : options.map(opt => ({ label: opt, value: opt }));

  const setPartQuery = (value: string[] | null) => {
    if (!value || value.length === 0) return deleteKey();

    const newValue = value.join(',');

    ampli.clickFilterPart({ group_part: newValue });

    if (selectedValue === newValue) return deleteKey();

    setValue(newValue);
  };

  React.useEffect(() => {
    if (!selectedValue) {
      const joined = options.join(',');
      setValue(joined);
    }
  }, []);

  return (
    <SDropDownContainer>
      <SelectV2.Root type="text" visibleOptions={6} defaultValue={defaultValue} onChange={setPartQuery} multiple={true}>
        <SelectV2.Trigger>
          <SelectV2.TriggerContent
            className={autoClass()}
            placeholder={label}
            label={label}
            // icon={
            //   defaultValue.length > 0 ? (
            //     <IconXCircle
            //       style={{ width: '20px', height: '20px', fill: 'white', color: 'black' }}
            //       onClick={e => {
            //         e.stopPropagation();
            //         setPartQuery(null);
            //       }}
            //     />
            //   ) : null
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
