import { Flex } from '@components/util/layout/Flex';
import {
  useCategoryParams,
  useIsOnlyActiveGenerationParams,
  usePartParams,
  useStatusParams,
} from '@hooks/queryString/custom';
import ResultItem from './ResultItem';
import InitializationButton from './InitializationButton';
import { styled } from 'stitches.config';
import { parseBool } from '@utils/parseBool';

function Result() {
  const { value: category, deleteValue: deleteCategoryValue } = useCategoryParams();
  const { value: status, deleteValue: deleteStatusValue } = useStatusParams();
  const { value: part, deleteValue: deletePartValue } = usePartParams();
  const { value: isOnlyActiveGeneration, setValue } = useIsOnlyActiveGenerationParams();
  return category.length === 0 && status.length === 0 && part.length === 0 && !parseBool(isOnlyActiveGeneration) ? (
    <div></div>
  ) : (
    <SResultWrapper align="center" justify="between">
      <Flex align="center" wrap="wrap">
        {category.map(selectedOption => (
          <ResultItem
            key={selectedOption}
            selectedOption={selectedOption}
            deleteValue={() => deleteCategoryValue(selectedOption)}
          />
        ))}
        {status.map(selectedOption => (
          <ResultItem
            key={selectedOption}
            selectedOption={selectedOption}
            deleteValue={() => deleteStatusValue(selectedOption)}
          />
        ))}
        {part.map(selectedOption => (
          <ResultItem
            key={selectedOption}
            selectedOption={selectedOption}
            deleteValue={() => deletePartValue(selectedOption)}
          />
        ))}
        {parseBool(isOnlyActiveGeneration) && (
          <ResultItem selectedOption={'활동 기수만'} deleteValue={() => setValue('false')} />
        )}
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
