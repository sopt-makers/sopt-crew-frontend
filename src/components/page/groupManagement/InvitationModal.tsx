import { Box } from '@components/box/Box';
import Textarea from '@components/Form/Textarea';
import DefaultModal from '@components/modal/DefaultModal';
import React, { useState } from 'react';
import { styled } from 'stitches.config';

interface InvitationModalProps {
  isModalOpened: boolean;
  title: string;
  handleModalClose: () => void;
}

const InvitationModal = ({
  isModalOpened,
  title,
  handleModalClose,
}: InvitationModalProps) => {
  const [textareaValue, setTextareaValue] = useState('');

  const handleInvitationButton = () => {
    console.log('초대하기 버튼 클릭');
  };

  return (
    <DefaultModal
      isModalOpened={isModalOpened}
      title={title}
      handleModalClose={handleModalClose}
    >
      <SInvitationModal>
        <STitle>회원 목록 ()</STitle>
        <STitle>초대 메시지</STitle>
        <SInvitationForm>
          <Textarea
            value={textareaValue}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setTextareaValue(e.target.value)
            }
            placeholder="(선택) 초대와 함께 보낼 메시지를 입력해주세요!"
            maxLength={300}
            error={
              textareaValue.length >= 300
                ? '300자 까지 입력할 수 있습니다.'
                : ''
            }
          />
        </SInvitationForm>
        <SButton onClick={handleInvitationButton}>초대하기</SButton>
      </SInvitationModal>
    </DefaultModal>
  );
};

export default InvitationModal;

const SInvitationModal = styled(Box, {
  padding: '$40',
  color: '$white',
});

const STitle = styled(Box, {
  mb: '$20',
  fontAg: '20_bold_100',
});

const SInvitationForm = styled(Box, {
  mb: '$4',

  textarea: {
    fontAg: '16_medium_150',
    fontFamily: 'SUIT',
    borderRadius: '15px',
    padding: '$16 $20',

    '&::-webkit-scrollbar': {
      width: '$6',
    },

    '&::-webkit-scrollbar-thumb': {
      height: '$70',
      backgroundColor: '$gray100',
      borderRadius: '6px',
    },
  },

  'textarea:focus': {
    boxShadow: '0 0 0 1px #8040ff',
  },
});

const SButton = styled('button', {
  display: 'block',
  margin: '0 auto',
  padding: '$20 0',
  width: '$175',
  borderRadius: '14px',
  color: '$white',
  fontAg: '20_bold_100',
  textAlign: 'center',
  background: '$purple100',
});
