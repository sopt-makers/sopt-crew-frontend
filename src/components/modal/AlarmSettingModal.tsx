import DefaultModal from '@components/modal/DefaultModal';
import { Chip } from '@sopt-makers/ui';
import { keywordOptions } from '@data/options';
import { styled } from 'stitches.config';
import { fontsObject } from '@sopt-makers/fonts';

interface props {
  isOpen: boolean;
  close: () => void;
  onSuccess?: () => void;
}

const AlarmSettingModal = ({ isOpen, close, onSuccess }: props) => {
  return (
    <DefaultModal isModalOpened={isOpen} title={'알림 설정'} handleModalClose={close} isSubmitting={false}>
      <SModalWrap>
        <SModalContentTitle>
          <SModalTitle>키워드</SModalTitle>
          <SModalSubTitle>선택한 키워드의 신규 모임이 생기면 푸시 알림을 보내드려요.</SModalSubTitle>
        </SModalContentTitle>
        <SModalChipWrap>
          {keywordOptions.map((keyword, index) => (
            <Chip
              key={index}
              onClick={() => {
                // Handle chip click logic here if needed
              }}
            >
              {keyword.label}
            </Chip>
          ))}
        </SModalChipWrap>
      </SModalWrap>
    </DefaultModal>
  );
};

const SModalWrap = styled('div', {
  padding: '$32 $40',
  height: '414px',
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
