import BottomSheetDialog from '@components/form/Select/BottomSheetSelect/BottomSheetDialog';
import { keywordSettiongOptions } from '@data/options';
import { IconCheck } from '@sopt-makers/icons';
import { styled } from '../../../../../../stitches.config';
import { fontsObject } from '@sopt-makers/fonts';
import { useMemo, useState } from 'react';

interface props {
  isOpen: boolean;
  close: () => void;
  selectedAlarm: string[];
  onKeywordClick: (value: string) => void;
}

const AlarmSettingBottomSheet = ({ isOpen, close, selectedAlarm, onKeywordClick }: props) => {
  return (
    <BottomSheetDialog isOpen={isOpen} label="필터" handleClose={close}>
      <SFilterWrapper>
        {keywordSettiongOptions.map((keyword, index) => (
          <SList key={keyword.label} onClick={() => onKeywordClick(keyword.value)}>
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
