import { Box } from '@components/box/Box';
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

function FilterModalOpenButton() {
  const { isMobile } = useDisplay();
  const [isModalOpened, setIsModalOpened] = useSessionStorage('filter&sort', false);
  const isModalOpen = useMemo(() => (isMobile ? false : isModalOpened), [isModalOpened, isMobile]);
  const isBottomSheetOpen = useMemo(() => (!isMobile ? false : isModalOpened), [isModalOpened, isMobile]);

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
  return (
    <>
      <SSelectModalOpenButton
        as="button"
        type="button"
        onClick={() => setIsModalOpened(true)}
        isFilterActive={isFilterActive}
        className="filter-button"
      >
        <SLabel>필터</SLabel>
        <EqualizerIcon width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} />
      </SSelectModalOpenButton>

      <FilterSelectModal isModalOpened={isModalOpen} handleModalClose={() => setIsModalOpened(false)} />

      <BottomSheet isOpen={isBottomSheetOpen} handleClose={() => setIsModalOpened(false)} />
    </>
  );
}
export default FilterModalOpenButton;

const SSelectModalOpenButton = styled(Box, {
  width: '159px',
  py: '$15',
  px: '$20',
  borderRadius: '14px',
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  variants: {
    isFilterActive: {
      true: {
        border: '1px solid $white100',
      },
      false: {
        border: '1px solid $black40',
      },
    },
  },
  '@tablet': {
    width: '112px',
    py: '$14',
    paddingRight: '$12',
    paddingLeft: '$16',
  },
});

const SLabel = styled('span', {
  fontAg: '18_medium_100',
  color: '$white100',
  '@tablet': {
    fontAg: '14_medium_100',
  },
});
