import { styled } from 'stitches.config';
import EqualizerIcon from '@assets/svg/equalizer.svg?rect';
import FilterSelectModal from '.';
import { useDisplay } from '@hooks/useDisplay';
import useSessionStorage from '@hooks/useSessionStorage';
import BottomSheet from './BottomSheet';
import { useMemo } from 'react';
import {
  useCategoryParams,
  useIsOnlyActiveGenerationParams,
  usePartParams,
  useStatusParams,
} from '@hooks/queryString/custom';
import { parseBool } from '@utils/parseBool';
import { ampli } from '@/ampli';

function FilterModalOpenButton() {
  const { isTablet } = useDisplay();
  const [isModalOpened, setIsModalOpened] = useSessionStorage('filter&sort', false);
  const isModalOpen = useMemo(() => (isTablet ? false : isModalOpened), [isModalOpened, isTablet]);
  const isBottomSheetOpen = useMemo(() => (!isTablet ? false : isModalOpened), [isModalOpened, isTablet]);

  const { value: category } = useCategoryParams();
  const { value: status } = useStatusParams();
  const { value: part } = usePartParams();
  const { value: isOnlyActiveGeneration } = useIsOnlyActiveGenerationParams();
  const isFilterActive = !(
    category.length === 0 &&
    status.length === 0 &&
    part.length === 0 &&
    !parseBool(isOnlyActiveGeneration)
  );

  const handleButtonClick = () => {
    ampli.clickFilterOn();
    setIsModalOpened(true);
  };

  return (
    <>
      <SSelectModalOpenButton
        as="button"
        type="button"
        onClick={handleButtonClick}
        isFilterActive={isFilterActive}
        className="filter-button"
      >
        <SLabel>필터</SLabel>
        <EqualizerIcon width={isTablet ? 16 : 24} height={isTablet ? 16 : 24} />
      </SSelectModalOpenButton>

      <FilterSelectModal isModalOpened={isModalOpen} handleModalClose={() => setIsModalOpened(false)} />

      <BottomSheet isOpen={isBottomSheetOpen} handleClose={() => setIsModalOpened(false)} />
    </>
  );
}
export default FilterModalOpenButton;

const SSelectModalOpenButton = styled('div', {
  width: '159px',
  py: '$15',
  px: '$20',
  borderRadius: '14px',
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  variants: {
    isFilterActive: {
      true: {
        border: '1px solid $gray10',
      },
      false: {
        border: '1px solid $gray600',
      },
    },
  },
  '@media (max-width: 768px)': {
    width: '112px',
    py: '$14',
    paddingRight: '$12',
    paddingLeft: '$16',
  },
});

const SLabel = styled('span', {
  fontAg: '18_medium_100',
  color: '$gray10',
  '@media (max-width: 768px)': {
    fontAg: '14_medium_100',
  },
});
