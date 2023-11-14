import { FilterType } from '@constants/option';
import { useMultiQueryString } from '@hooks/queryString';
import { CSSType, styled } from 'stitches.config';
import ChipItem from './ChipItem';

interface ChipProps {
  css?: CSSType;
  filter: FilterType;
}

function Chip({ css, filter }: ChipProps) {
  const { label, subject, options } = filter;
  const { value: selectedValues, addValue, deleteValue } = useMultiQueryString(subject, true);
  return (
    <SChipWrapper css={{ ...css }}>
      {label && <SLabel>{label}</SLabel>}
      {options.map(option => (
        <ChipItem
          key={option}
          isSelected={selectedValues.includes(option)}
          label={label}
          value={option}
          addValue={addValue}
          deleteValue={deleteValue}
        />
      ))}
    </SChipWrapper>
  );
}

export default Chip;

const SChipWrapper = styled('div', {});
const SLabel = styled('p', {
  color: '$gray10',
  fontAg: '18_bold_100',
  mb: '$20',
  '@tablet': {
    fontAg: '14_bold_100',
    mb: '$6',
  },
});
