import BottomSheetDialog from '@components/form/Select/BottomSheetSelect/BottomSheetDialog';
import { keywordSettiongOptions } from '@data/options';
import { IconCheck } from '@sopt-makers/icons';
import { styled } from '../../../../../../stitches.config';
import { fontsObject } from '@sopt-makers/fonts';
import { KeywordSettingOptionType } from '@api/user';

interface AlarmSettingBottomSheetType {
  isOpen: boolean;
  close: () => void;
  selectedAlarm: KeywordSettingOptionType[];
  onKeywordClick: (value: KeywordSettingOptionType) => void;
}

const AlarmSettingBottomSheet = ({ isOpen, close, selectedAlarm, onKeywordClick }: AlarmSettingBottomSheetType) => {
  return (
    <BottomSheetDialog isOpen={isOpen} label="필터" handleClose={close}>
      <SFilterWrapper>
        {keywordSettiongOptions.map(keyword => (
          <SList role="checkbox" key={keyword} onClick={() => onKeywordClick(keyword)}>
            <SListTitle>{keyword}</SListTitle>
            {selectedAlarm.includes(keyword) && <IconCheck />}
          </SList>
        ))}
      </SFilterWrapper>
    </BottomSheetDialog>
  );
};

export default AlarmSettingBottomSheet;

const SListTitle = styled('div', {
  ...fontsObject.BODY_3_14_M,
});

const SList = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '$10 0',
  '& > svg': {
    width: '$20',
    height: '$20',
    color: '$success',
  },
});

const SFilterWrapper = styled('div', {
  px: '$20',
  marginBottom: '$20',
});
