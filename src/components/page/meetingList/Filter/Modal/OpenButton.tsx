import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';
import EqualizerIcon from '@assets/svg/equalizer.svg?rect';
import FilterSelectModal from '.';
import { useDisplay } from '@hooks/useDisplay';
import useSessionStorage from '@hooks/useSessionStorage';
import BottomSheet from './BottomSheet';
import { useMemo } from 'react';

function FilterModalOpenButton() {
  const { isMobile } = useDisplay();
  const [isModalOpened, setIsModalOpened] = useSessionStorage('filter&sort', false);
  const isModalOpen = useMemo(() => (isMobile ? false : isModalOpened), [isModalOpened, isMobile]);
  const isBottomSheetOpen = useMemo(() => (!isMobile ? false : isModalOpened), [isModalOpened, isMobile]);
  return (
    <>
      <SSelectModalOpenButton as="button" type="button" onClick={() => setIsModalOpened(true)}>
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
  border: '1px solid $black20',
  borderRadius: '14px',
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  '@mobile': {
    width: '112px',
    py: '$14',
    paddingRight: '$12',
    paddingLeft: '$16',
  },
});

const SLabel = styled('span', {
  fontAg: '18_medium_100',
  color: '$white',
  '@mobile': {
    fontAg: '14_medium_100',
  },
});
