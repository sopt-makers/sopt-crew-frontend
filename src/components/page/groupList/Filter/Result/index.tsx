import { Flex } from '@components/util/layout/Flex';
import { useCategoryParams, useStatusParams } from '@hooks/queryString/custom';
import ResultItem from './ResultItem';
import InitializationButton from './InitializationButton';
import { styled } from 'stitches.config';

function Result() {
  const { value: category, deleteValue: deleteCategoryValue } =
    useCategoryParams();
  const { value: status, deleteValue: deleteStatusValue } = useStatusParams();

  return category.length === 0 && status.length === 0 ? (
    <div></div>
  ) : (
    <SResultWrapper align="center" justify="between">
      <Flex align="center" wrap="wrap">
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
  marginTop: '24px',
  padding: '20px 24px',
  backgroundColor: '$black80',
  borderRadius: '10px',
  '@mobile': {
    padding: '12px 20px',
    marginRight: '-20px',
    marginLeft: '-20px',
    borderRadius: '0',
  },
});
