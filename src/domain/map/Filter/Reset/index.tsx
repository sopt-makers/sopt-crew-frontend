import { useCategoryParams } from '@hook/queryString/custom';
import { IconRefresh } from '@sopt-makers/icons';
import { styled } from 'stitches.config';

const FilterResetButton = () => {
  const { resetQuery } = useCategoryParams();

  const handleFilterRefresh = () => {
    resetQuery();
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
