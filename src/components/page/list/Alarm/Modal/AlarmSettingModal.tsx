import DefaultModal from '@components/modal/DefaultModal';
import { Chip } from '@sopt-makers/ui';
import { keywordSettiongOptions } from '@data/options';
import { styled } from 'stitches.config';
import { fontsObject } from '@sopt-makers/fonts';
import { IconRefresh } from '@sopt-makers/icons';
import { KeywordSettingOptionType } from '@api/user';

interface props {
  isOpen: boolean;
  close: () => void;
  selectedAlarm: string[];
  onKeywordClick: (value: KeywordSettingOptionType) => void;
  onReset: () => void;
}

/** * AlarmSettingModal 컴포넌트는 사용자가 키워드 알림을 설정할 수 있는 모달입니다. */

const AlarmSettingModal = ({ isOpen, close, selectedAlarm, onKeywordClick, onReset }: props) => {
  return (
    <DefaultModal
      titleLeft={
        <SRefreshButton onClick={onReset}>
          <IconRefresh />
        </SRefreshButton>
      }
      isModalOpened={isOpen}
      title={'알림 설정'}
      handleModalClose={close}
      isSubmitting={false}
    >
      <SModalWrap>
        <SModalContentTitle>
          <SModalTitle>키워드</SModalTitle>
          <SModalSubTitle>선택한 키워드의 신규 모임이 생기면 푸시 알림을 보내드려요.</SModalSubTitle>
        </SModalContentTitle>
        <SModalChipWrap>
          {keywordSettiongOptions.map(keyword => {
            return (
              <Chip
                key={keyword}
                onClick={() => {
                  onKeywordClick(keyword);
                }}
                active={selectedAlarm.includes(keyword)}
              >
                {keyword}
              </Chip>
            );
          })}
        </SModalChipWrap>
      </SModalWrap>
    </DefaultModal>
  );
};

const SRefreshButton = styled('div', {
  '& > svg': {
    width: '$20',
    height: '$20',
    color: '$gray200',
  },
});

const SModalWrap = styled('div', {
  padding: '$32 $40',
  height: '414px',
  borderTop: '1px solid $gray600',
});

const SModalContentTitle = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '$12',

  marginBottom: '$20',
});

const SModalTitle = styled('h2', {
  ...fontsObject.TITLE_5_18_SB,
  color: '$gray10',
});

const SModalSubTitle = styled('p', {
  ...fontsObject.BODY_3_14_R,
  color: '$gray100',
});
const SModalChipWrap = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
});

export default AlarmSettingModal;
