import DefaultModal from '@components/modal/DefaultModal';
import { Chip } from '@sopt-makers/ui';
import { keywordOptions } from '@data/options';
import { styled } from 'stitches.config';
import { fontsObject } from '@sopt-makers/fonts';
import { IconRefresh } from '@sopt-makers/icons';
import { useState } from 'react';

interface props {
  isOpen: boolean;
  close: () => void;
  onChipSubmit: (keywords: string[]) => void;
}

/** * AlarmSettingModal 컴포넌트는 사용자가 키워드 알림을 설정할 수 있는 모달입니다. */

const AlarmSettingModal = ({ isOpen, close, onChipSubmit }: props) => {
  const [selectedAlarm, setSelectedAlarm] = useState<string[]>([]);

  const handleRefreshClick = () => {
    setSelectedAlarm([]);
    onChipSubmit([]);
  };
  const handleChipClick = (value: string) => {
    const nextSelectedAlarm = selectedAlarm.includes(value)
      ? selectedAlarm.filter(v => v !== value)
      : [...selectedAlarm, value];

    setSelectedAlarm(nextSelectedAlarm);
    onChipSubmit(nextSelectedAlarm);
  };

  return (
    <DefaultModal
      titleLeft={
        <SRefreshButton onClick={handleRefreshClick}>
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
          {keywordOptions.map((keyword, index) => {
            return (
              <Chip
                key={index}
                onClick={() => {
                  handleChipClick(keyword.value);
                }}
                active={selectedAlarm.includes(keyword.value)}
              >
                {keyword.label}
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
