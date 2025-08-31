import BottomSheetDialog from '@components/form/Select/BottomSheetSelect/BottomSheetDialog';
import { CATEGORY_FILTER, PART_FILTER, STATUS_FILTER } from '@constants/option';
import { styled } from 'stitches.config';
import Chip from '../Chip';
import Toggle from '../Toggle';
import InitializationButton from './InitializationButton';
interface BottomSheetDialogProps {
  isOpen: boolean;
  handleClose: () => void;
}

function BottomSheet({ isOpen, handleClose }: BottomSheetDialogProps) {
  const filterSectionStyle = { mb: '$48', '@media (max-width: 768px)': { mb: '$40' } };

  return (
    <BottomSheetDialog
      isOpen={isOpen}
      label="필터"
      handleClose={handleClose}
      headerRight={<InitializationButton css={{ '@media (max-width: 768px)': { mt: 0 } }} withText={false} size={16} />}
    >
      <FilterWrapper>
        <Chip css={filterSectionStyle} filter={CATEGORY_FILTER} />
        <Chip css={filterSectionStyle} filter={STATUS_FILTER} />
        <Toggle css={filterSectionStyle} label="대상 기수" />
        <Chip css={filterSectionStyle} filter={PART_FILTER} />
      </FilterWrapper>
    </BottomSheetDialog>
  );
}

export default BottomSheet;

const FilterWrapper = styled('div', {
  px: '$20',
});
