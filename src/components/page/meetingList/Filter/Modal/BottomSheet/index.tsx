import { Box } from '@components/box/Box';
import BottomSheetDialog from '@components/form/Select/BottomSheetSelect/BottomSheetDialog';
import { CATEGORY_FILTER, PART_FILTER, STATUS_FILTER } from '@constants/option';
import { styled } from 'stitches.config';
import InitializationButton from '../../Result/InitializationButton';
import Chip from '../Chip';
import Toggle from '../Toggle';
interface BottomSheetDialogProps {
  isOpen: boolean;
  handleClose: () => void;
}

function BottomSheet({ isOpen, handleClose }: BottomSheetDialogProps) {
  const filterSectionStyle = { mb: '$48', '@mobile': { mb: '$40' } };

  return (
    <BottomSheetDialog
      isOpen={isOpen}
      label="필터"
      handleClose={handleClose}
      headerRight={<InitializationButton css={{ '@mobile': { mt: 0 } }} withText={false} size={16} />}
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

const FilterWrapper = styled(Box, {
  px: '$20',
});
