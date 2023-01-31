import XSmallIcon from '@assets/svg/x_small.svg?rect';
import { Flex } from '@components/util/layout/Flex';
import { styled } from 'stitches.config';

function ResultItem({
  selectedOption,
  deleteValue,
}: {
  selectedOption: string;
  deleteValue: (value: string) => void;
}) {
  return (
    <SResultItemWrapper align="center" justify="between">
      <SFilterItemName>{selectedOption}</SFilterItemName>
      <SCancelButton onClick={() => deleteValue(selectedOption)}>
        <XSmallIcon />
      </SCancelButton>
    </SResultItemWrapper>
  );
}
export default ResultItem;

const SResultItemWrapper = styled(Flex, {
  backgroundColor: '$black100',
  border: '1px solid $black40',
  borderRadius: '44px',
  padding: '10px 16px',
  whiteSpace: 'nowrap',

  margin: '4px',
  '@mobile': {
    border: '1px solid $white',
    svg: {
      width: '12px',
    },
  },
});
const SFilterItemName = styled('p', {
  marginRight: '$8',
  '@mobile': {
    fontAg: '12_semibold_100',
  },
});
const SCancelButton = styled('button', {
  flexType: 'center',
});
