import { Box } from '@components/box/Box';
import DefaultModal from '@components/modal/DefaultModal';
import { CATEGORY_FILTER, PART_FILTER, STATUS_FILTER } from '@constants/option';
import { styled } from 'stitches.config';
import InitializationButton from '../Result/InitializationButton';
import Chip from './Chip';
import Toggle from './Toggle';

interface FilterSelectModalProps {
  isModalOpened: boolean;
  handleModalClose: () => void;
}
function FilterSelectModal({ isModalOpened, handleModalClose }: FilterSelectModalProps) {
  const filterSectionStyle = { mb: '$48', '@tablet': { mb: '$40' } };
  return (
    <DefaultModal
      isModalOpened={isModalOpened}
      handleModalClose={handleModalClose}
      title={'필터 및 정렬'}
      titleLeft={<InitializationButton withText={false} size={24} />}
    >
      <SSelectWrapper>
        <Chip css={filterSectionStyle} filter={CATEGORY_FILTER} />
        <Chip css={filterSectionStyle} filter={STATUS_FILTER} />
        <Toggle css={filterSectionStyle} label="대상 기수" />
        <Chip css={filterSectionStyle} filter={PART_FILTER} />
      </SSelectWrapper>
    </DefaultModal>
  );
}
export default FilterSelectModal;

const SSelectWrapper = styled(Box, {
  px: '$40',
  pt: '$32',
});
