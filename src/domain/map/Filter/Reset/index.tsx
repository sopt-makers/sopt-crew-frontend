import { useCategoryParams } from '@hook/queryString/custom';
import { fontsObject } from '@sopt-makers/fonts';
import { styled } from 'stitches.config';

const FilterResetButton = () => {
  const { resetQuery: resetCategory } = useCategoryParams();

  const handleFilterRefresh = () => {
    resetCategory();
  };

  return <RefreshButton onClick={handleFilterRefresh}>초기화</RefreshButton>;
};

export default FilterResetButton;

const RefreshButton = styled('button', {
  ...fontsObject.LABEL_2_16_SB,
  color: '$success',
});
