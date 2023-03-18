import { Box } from '@components/box/Box';
import { useMultiQueryString } from '@hooks/queryString';
import { CSSType, styled } from 'stitches.config';
import { FilterType } from '..';
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
          value={option}
          addValue={addValue}
          deleteValue={deleteValue}
        />
      ))}
    </SChipWrapper>
  );
}

export default Chip;
const SChipWrapper = styled(Box, {});
const SLabel = styled('p', {
  color: '$white',
  fontAg: '18_bold_100',
  mb: '$20',
});
