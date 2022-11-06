import { Flex } from '@components/util/layout/Flex';
import { styled } from '@stitches/react';
import XSmallIcon from '@assets/svg/x_small.svg';
import ResetIcon from '@assets/svg/reset.svg';
import useGroupListFilter from '@hooks/groupList/useGroupListFilter';
function Result() {
  const { category, status } = useGroupListFilter();

  return category.length === 0 && status.length === 0 ? (
    <div></div>
  ) : (
    <SResultWrapper align="center" justify="between">
      <Flex align="center">
        {category.map(selectedOption => (
          <ResultItem
            key={selectedOption}
            category="category"
            selectedOption={selectedOption}
          />
        ))}
        {status.map(selectedOption => (
          <ResultItem
            key={selectedOption}
            category="status"
            selectedOption={selectedOption}
          />
        ))}
      </Flex>
      <InitializationButton />
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

function ResultItem({
  category,
  selectedOption,
}: {
  category: string;
  selectedOption: string;
}) {
  const { deleteFilterOptions } = useGroupListFilter();

  return (
    <SResultItemWrapper align="center" justify="between">
      <SFilterItemName>{selectedOption}</SFilterItemName>
      <SCancelButton
        onClick={() => deleteFilterOptions(category)(selectedOption)}
      >
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

function InitializationButton() {
  const { resetFilterOptions } = useGroupListFilter();

  return (
    <Flex as="button" onClick={resetFilterOptions}>
      <ResetIcon />
      <InitializationText>초기화</InitializationText>
    </Flex>
  );
}

const InitializationText = styled('span', {
  //   fontAg: '18_medium_100',
  color: '$white',
  fontSize: '18px',
  fontWeight: '$medium',
  marginLeft: '6px',
});
