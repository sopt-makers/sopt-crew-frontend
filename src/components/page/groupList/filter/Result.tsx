import { Flex } from '@components/util/layout/Flex';
import { styled } from '@stitches/react';
import XSmallIcon from '@assets/svg/x_small.svg';
import ResetIcon from '@assets/svg/reset.svg';
import { useCategoryParams, useStatusParams } from '@hooks/queryString/custom';
function Result() {
  const { value: category, deleteValue: deleteCategoryValue } =
    useCategoryParams();
  const { value: status, deleteValue: deleteStatusValue } = useStatusParams();
  return category.length === 0 && status.length === 0 ? (
    <div></div>
  ) : (
    <SResultWrapper align="center" justify="between">
      <Flex align="center">
        {category.map(selectedOption => (
          <ResultItem
            key={selectedOption}
            selectedOption={selectedOption}
            deleteValue={deleteCategoryValue}
          />
        ))}
        {status.map(selectedOption => (
          <ResultItem
            key={selectedOption}
            selectedOption={selectedOption}
            deleteValue={deleteStatusValue}
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
  selectedOption,
  deleteValue,
}: {
  selectedOption: string;
  deleteValue: (value: string) => void;
}) {
  console.log(selectedOption);
  return (
    <SResultItemWrapper align="center" justify="between">
      <SFilterItemName>{selectedOption}</SFilterItemName>
      <SCancelButton onClick={() => deleteValue(selectedOption)}>
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
  const { deleteKey: resetCategory } = useCategoryParams();
  const { deleteKey: resetStatus } = useStatusParams();
  return (
    <Flex
      as="button"
      onClick={() => {
        resetCategory(), resetStatus();
      }}
    >
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
