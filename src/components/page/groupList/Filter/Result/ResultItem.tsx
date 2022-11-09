import { styled } from '@stitches/react';
import XSmallIcon from '@assets/svg/x_small.svg';
import { Flex } from '@components/util/layout/Flex';

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
  '& + &': {
    marginLeft: '8px',
  },
});
const SFilterItemName = styled('p', {
  marginRight: '$8',
});
const SCancelButton = styled('button', {
  flexType: 'center',
});
