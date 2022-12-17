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
  const [isAllSelected, setIsAllSelected] = useState(false);

  // TODO: API 연결 전 임시로 사용
  const memberList = [
    { id: 0, name: '백지연' },
    { id: 1, name: '유저명' },
  ];

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
        <SMemberTitleContainer>
          <STitle>회원 목록 ()</STitle>
          <div>
            <button>선택 회원 보기 ()</button>
            <SAllButton onClick={() => setIsAllSelected(prev => !prev)}>
              전체 {isAllSelected ? '선택' : '해제'}
            </SAllButton>
          </div>
        </SMemberTitleContainer>
        <SMemberList>
          {memberList.map(({ id, name }) => (
            <div key={id}>{name}</div>
          ))}
        </SMemberList>
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
        <SInvitationButton onClick={handleInvitationButton}>
          초대하기
        </SInvitationButton>
      </SInvitationModal>
    </DefaultModal>
  );
};

export default InvitationModal;

const SInvitationModal = styled(Box, {
  height: '$764',
  padding: '$40',
  color: '$white',
});

const SMemberTitleContainer = styled(Box, {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  mt: '$40',
  mb: '$20',

  '@mobile': {
    mt: '$36',
    mb: '$28',
  },

  button: {
    fontAg: '16_medium_100',
    color: '$gray60',

    '@mobile': {
      fontAg: '12_semibold_100',
    },
  },
});

const SAllButton = styled('button', {
  ml: '$20',
});

const SMemberList = styled(Box, {
  height: '$254',
});

const STitle = styled(Box, {
  fontAg: '20_bold_100',

  '@mobile': {
    fontAg: '16_bold_100',
  },
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

const SInvitationButton = styled('button', {
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
