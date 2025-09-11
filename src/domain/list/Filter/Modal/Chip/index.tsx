import { FilterType } from '@constant/option';
import { useMultiQueryString } from '@hook/queryString';
import { CSSType, styled } from 'stitches.config';
import ChipItem from './ChipItem';

interface ChipsProps {
  isLabel?: boolean;
  css?: CSSType;
  filter: FilterType;
}

function Chips({ isLabel, css, filter }: ChipsProps) {
  //해당 Chip 선택시 Chip의 filter로 전달된 subject를 이용하여 쿼리 세팅
  const { label, subject, options } = filter;
  const { value: selectedValues, addValue, deleteValue, resetQuery } = useMultiQueryString(subject, true);

  const isEntire = !selectedValues.length;
  return (
    <SChipWrapper css={{ ...css }}>
      {isLabel && <SLabel>{label}</SLabel>}
      {options.map(option => (
        <ChipItem
          key={option}
          isSelected={selectedValues.includes(option) || (isEntire && option === '전체')}
          label={label}
          value={option}
          addValue={addValue}
          deleteValue={deleteValue}
          resetQuery={resetQuery}
        />
      ))}
    </SChipWrapper>
  );
}

export default Chips;

const SChipWrapper = styled('div', {});
const SLabel = styled('p', {
  color: '$gray10',
  fontAg: '18_bold_100',
  mb: '$20',
  '@media (max-width: 768px)': {
    fontAg: '14_bold_100',
    mb: '$6',
  },
});
