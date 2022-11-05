import { Flex } from '@components/util/layout/Flex';
import { styled } from '@stitches/react';
import XSmallIcon from '@assets/svg/x_small.svg';
function Result() {
  return (
    <SResultWrapper align="center">
      <ResultItem />
    </SResultWrapper>
  );
}

export default Result;

const SResultWrapper = styled(Flex, {
  height: '40px',
  marginTop: '24px',
  padding: '20px 24px',
  backgroundColor: '$black80',
  borderRadius: '10px',
});

function ResultItem() {
  return (
    <SResultItemWrapper align="center" justify="between">
      <FilterItemName>스터디</FilterItemName>
      <SCancelButton>
        <XSmallIcon />
      </SCancelButton>
    </SResultItemWrapper>
  );
}

const SResultItemWrapper = styled(Flex, {
  backgroundColor: '$black100',
  border: '1px solid $black40',
  borderRadius: '44px',
  padding: '10px 16px',
});
const FilterItemName = styled('p', {
  marginRight: '$8',
});
const SCancelButton = styled('button', {
  flexType: 'center',
});
