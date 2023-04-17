import { Box } from '@components/box/Box';
import Textarea from '@components/form/Textarea';
import DefaultModal from '@components/modal/DefaultModal';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { invite } from '@api/meeting';
import { styled } from 'stitches.config';
import SelectUsersStep from './SelectUsersStep';

interface InvitationModalProps {
  isModalOpened: boolean;
  title: string;
  handleModalClose: () => void;
}

const InvitationModal = ({ isModalOpened, title, handleModalClose }: InvitationModalProps) => {
  const router = useRouter();
  const meetingId = router.query.id as string;
  const [currentStep, setCurrentStep] = useState<'selectUsers' | 'writeMessage'>('selectUsers');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [inviteMessage, setInviteMessage] = useState('');

  const handleSubmit = async () => {
    try {
      await invite(meetingId, inviteMessage, selectedUsers);
      alert('초대 메세지를 전송했습니다.');
    } catch (error) {
      alert('초대 메세지를 전송하지 못했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <DefaultModal isModalOpened={isModalOpened} title={title} handleModalClose={handleModalClose}>
      <SInvitationModal>
        {currentStep === 'selectUsers' && (
          <>
            <SelectUsersStep selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
            <Footer>
              <SubmitButton onClick={() => setCurrentStep('writeMessage')} disabled={!selectedUsers.length}>
                다음
              </SubmitButton>
            </Footer>
          </>
        )}
        {currentStep === 'writeMessage' && (
          <>
            <STitle>초대 메시지</STitle>
            <SInvitationForm>
              <Textarea
                value={inviteMessage}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInviteMessage(e.target.value)}
                placeholder="(선택) 초대와 함께 보낼 메시지를 입력해주세요!"
                maxLength={300}
                error={inviteMessage.length >= 300 ? '300자 까지 입력할 수 있습니다.' : ''}
              />
            </SInvitationForm>
            <Footer>
              <SubmitButton
                onClick={() => {
                  handleSubmit();
                  handleModalClose();
                }}
              >
                초대하기
              </SubmitButton>
              <BackButton onClick={() => setCurrentStep('selectUsers')}>이전</BackButton>
            </Footer>
          </>
        )}
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
  fontAg: '20_bold_100',
  marginBottom: '18px',
  '@mobile': {
    fontAg: '16_bold_100',
  },
});

const SInvitationForm = styled(Box, {
  mb: '$4',
  textarea: {
    height: '384px',
    borderRadius: '15px',
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

const Footer = styled(Box, {
  marginTop: '32px',
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const SubmitButton = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px 46px',
  fontAg: '18_bold_100',
  color: '$white',
  background: '$purple100',
  borderRadius: '12px',
  '&:disabled': {
    cursor: 'default',
    opacity: 0.5,
  },
});
const BackButton = styled(SubmitButton, {
  background: '$black20 !important',
});
