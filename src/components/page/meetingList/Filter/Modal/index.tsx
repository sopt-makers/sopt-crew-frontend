import { Box } from '@components/box/Box';
import DefaultModal from '@components/modal/DefaultModal';
import { styled } from 'stitches.config';
import InitializationButton from '../Result/InitializationButton';
import Chip from './Chip';
import Toggle from './Toggle';

interface FilterSelectModalProps {
  isModalOpened: boolean;
  handleModalClose: () => void;
}
export interface FilterType {
  label: string;
  subject: string;
  options: string[];
}
const CATEGORY_FILTER = {
  label: '카테고리',
  subject: 'category',
  options: ['스터디'],
};
const STATUS_FILTER = {
  label: '모집 상태',
  subject: 'status',
  options: ['모집 전', '모집 중', '모집 마감'],
};
const PART_FILTER = {
  label: '대상 파트',
  subject: 'part',
  options: ['기획', '디자인', '안드로이드', 'IOS', '웹', '서버'],
};
function FilterSelectModal({ isModalOpened, handleModalClose }: FilterSelectModalProps) {
  return (
    <DefaultModal
      isModalOpened={isModalOpened}
      handleModalClose={handleModalClose}
      title={'필터 및 정렬'}
      titleLeft={<InitializationButton withText={false} size={24} />}
    >
      <SSelectWrapper>
        <Chip css={{ mb: '$48' }} filter={CATEGORY_FILTER} />
        <Chip css={{ mb: '$48' }} filter={STATUS_FILTER} />
        <Toggle css={{ mb: '$48' }} label="대상 기수" />
        <Chip css={{ mb: '$48' }} filter={PART_FILTER} />
      </SSelectWrapper>
    </DefaultModal>
  );
}
export default FilterSelectModal;

const SSelectWrapper = styled(Box, {
  px: '$40',
  pt: '$32',
});
