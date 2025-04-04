import XSmallIcon from '@assets/svg/x_small.svg?rect';
import { Flex } from '@components/util/layout/Flex';
import { styled } from 'stitches.config';

function ResultItem({ selectedOption, deleteValue }: { selectedOption: string; deleteValue: () => void }) {
  return (
    <SResultItemWrapper align="center" justify="between">
      <SFilterItemName>{selectedOption}</SFilterItemName>
      <SCancelButton onClick={deleteValue}>
        <XSmallIcon />
      </SCancelButton>
    </SResultItemWrapper>
  );
}
export default ResultItem;

const SResultItemWrapper = styled(Flex, {
  backgroundColor: '$gray950',
  border: '1px solid $gray600',
  borderRadius: '44px',
  padding: '$8 $10 $8 $12 ',
  whiteSpace: 'nowrap',
  margin: '4px',
  '@media (max-width: 768px)': {
    border: '1px solid $gray10',
    svg: {
      width: '12px',
    },
  },
});
const SFilterItemName = styled('p', {
  marginRight: '$8',
  '@media (max-width: 768px)': {
    fontAg: '12_semibold_100',
  },
});
const SCancelButton = styled('button', {
  flexType: 'center',
});
