import BottomSheetDialog from '@components/form/Select/BottomSheetSelect/BottomSheetDialog';
import { keywordOptions } from '@data/options';
import { IconCheck } from '@sopt-makers/icons';
import { styled } from '../../../../../../stitches.config';
import { fontsObject } from '@sopt-makers/fonts';
import { useState } from 'react';

interface props {
  isOpen: boolean;
  close: () => void;
}

const AlarmSettingBottomSheet = ({ isOpen, close }: props) => {
  const [selectedAlarm, setSelectedAlarm] = useState<string[]>([]);

  const handleKeywordClick = (value: string) => {
    const nextSelectedAlarm = selectedAlarm.includes(value)
      ? selectedAlarm.filter(v => v !== value)
      : [...selectedAlarm, value];

    setSelectedAlarm(nextSelectedAlarm);
    // onChipSubmit(nextSelectedAlarm);
  };

  return (
    <BottomSheetDialog isOpen={isOpen} label="필터" handleClose={close}>
      <SFilterWrapper>
        {keywordOptions.map((keyword, index) => (
          <SList key={keyword.label} onClick={() => handleKeywordClick(keyword.value)}>
            <SListTitle>{keyword.label}</SListTitle>
            {selectedAlarm.includes(keyword.value) && <IconCheck />}
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
