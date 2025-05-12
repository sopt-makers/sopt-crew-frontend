import { IconRefresh } from '@sopt-makers/icons';
import { styled } from '../../../../../../stitches.config';
import {
  useCategoryParams,
  useIsOnlyActiveGenerationParams,
  usePartParams,
  useSearchParams,
  useStatusParams,
} from '@hooks/queryString/custom';

const FilterResetButton = () => {
  const { deleteKey: deleteCategory } = useCategoryParams();
  const { deleteKey: deleteStatus } = useStatusParams();
  const { deleteKey: deletePart } = usePartParams();
  const { deleteKey: deleteIsOnlyActive } = useIsOnlyActiveGenerationParams();

  const handleFilterRefresh = () => {
    deleteCategory();
    deleteStatus();
    deletePart();
    deleteIsOnlyActive();
  };

  return (
    <RefreshButton onClick={handleFilterRefresh}>
      <IconRefresh />
    </RefreshButton>
  );
};

export default FilterResetButton;

const RefreshButton = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$8',
  background: '$gray800',
  padding: '$14 $16',
  cursor: 'pointer',

  '& > svg': {
    width: '$20',
    height: '$20',
  },
});
