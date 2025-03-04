import DefaultModal from '@components/modal/DefaultModal';
import { CATEGORY_FILTER, PART_FILTER, STATUS_FILTER } from '@constants/option';
import { styled } from 'stitches.config';
import InitializationButton from '../Result/InitializationButton';
import Chips from './Chip';
import Toggle from './Toggle';
interface FilterSelectModalProps {
  isModalOpened: boolean;
  handleModalClose: () => void;
}

//Notice: 현재 사용 중이지 않습니다.
function FilterSelectModal({ isModalOpened, handleModalClose }: FilterSelectModalProps) {
  const filterSectionStyle = { mb: '$48', '@media (max-width: 768px)': { mb: '$40' } };
  return (
    <DefaultModal
      isModalOpened={isModalOpened}
      handleModalClose={handleModalClose}
      title={'필터 및 정렬'}
      titleLeft={<InitializationButton withText={false} size={24} />}
    >
      <SSelectWrapper>
        <Chips css={filterSectionStyle} filter={CATEGORY_FILTER} isLabel={true} />
        <Chips css={filterSectionStyle} filter={STATUS_FILTER} isLabel={true} />
        <Toggle css={filterSectionStyle} label="대상 기수" />
        <Chips css={filterSectionStyle} filter={PART_FILTER} isLabel={true} />
      </SSelectWrapper>
    </DefaultModal>
  );
}
export default FilterSelectModal;

const SSelectWrapper = styled('div', {
  px: '$40',
  pt: '$32',
});
