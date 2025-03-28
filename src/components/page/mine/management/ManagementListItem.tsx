import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { styled } from 'stitches.config';
import useModal from '@hooks/useModal';
import DefaultModal from '@components/modal/DefaultModal';
import { useMutationUpdateApplication } from '@api/API_LEGACY/meeting/hooks';
import { APPLICATION_TYPE, EApprovalStatus, APPROVAL_STATUS_ENGLISH_TO_KOREAN } from '@constants/option';
import { playgroundLink } from '@sopt-makers/playground-common';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import dayjs from 'dayjs';
import { AxiosError } from 'axios';
import alertErrorMessage from '@utils/alertErrorMessage';
import { ampli } from '@/ampli';
import { ApplicationData } from '@api/meeting';

interface ManagementListItemProps {
  meetingId: number;
  application: ApplicationData;
  isHost: boolean;
}

const ManagementListItem = ({ meetingId, application, isHost }: ManagementListItemProps) => {
  const { appliedDate, content = '', status = 'WAITING', user, type } = application;
  const date = dayjs(appliedDate).format('YY.MM.DD');
  const time = dayjs(appliedDate).format('HH:mm:ss');
  const { isModalOpened, handleModalOpen, handleModalClose } = useModal();
  const { mutateAsync: mutateUpdateApplication } = useMutationUpdateApplication({});
  const queryClient = useQueryClient();
  const [isMutateLoading, setIsMutateLoading] = useState(false);

  const handleProfileClick = (id: string) => {
    ampli.clickManagementListProfile();
    window.location.href = `${playgroundLink.memberDetail(id)}`;
  };

  const handleChangeApplicationStatus = (status: number) => async () => {
    setIsMutateLoading(true);
    try {
      await mutateUpdateApplication({
        id: meetingId,
        applyId: application.id,
        status,
      });
      await queryClient.invalidateQueries({
        queryKey: ['getMeetingPeopleList'],
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        alertErrorMessage(error);
      }
    } finally {
      setIsMutateLoading(false);
    }
  };

  const addHyphenToPhoneNumber = (phoneNumber: string) =>
    phoneNumber.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);

  const handleDetailButtonClick = () => {
    ampli.clickManagementListPromise({ submit_promise: content ? true : false });
    handleModalOpen();
  };

  return (
    <>
      {isHost && (
        <>
          <SDesktopListItem>
            <SUserInformation>
              <SDesktopProfile>
                <SProfileImage>
                  {user.profileImage ? <img src={user.profileImage} alt="" /> : <ProfileDefaultIcon />}
                </SProfileImage>
                <SName onClick={() => handleProfileClick(user.orgId)}>{user.name}</SName>
                <SUserStatus status={status}>{APPROVAL_STATUS_ENGLISH_TO_KOREAN[status]}</SUserStatus>
              </SDesktopProfile>
              <SGeneration>{user.recentActivity.generation}기</SGeneration>
              <SPhone>{user.phone ? addHyphenToPhoneNumber(user.phone) : '-'}</SPhone>
              <SDateAndTime>
                <SDate>{date}</SDate>
                <STime>{time}</STime>
              </SDateAndTime>
            </SUserInformation>
            <SButtonContainer>
              {
                <>
                  {status === 'WAITING' && (
                    <>
                      <SWhiteButton
                        disabled={isMutateLoading}
                        onClick={handleChangeApplicationStatus(EApprovalStatus.APPROVE)}
                      >
                        승인
                      </SWhiteButton>
                      <SGrayButton
                        disabled={isMutateLoading}
                        onClick={handleChangeApplicationStatus(EApprovalStatus.REJECT)}
                      >
                        거절
                      </SGrayButton>
                    </>
                  )}
                  {status === 'APPROVE' && (
                    <SGrayButton
                      disabled={isMutateLoading}
                      onClick={handleChangeApplicationStatus(EApprovalStatus.WAITING)}
                    >
                      승인 취소
                    </SGrayButton>
                  )}
                  {status === 'REJECT' && (
                    <SGrayButton
                      disabled={isMutateLoading}
                      onClick={handleChangeApplicationStatus(EApprovalStatus.WAITING)}
                    >
                      거절 취소
                    </SGrayButton>
                  )}
                </>
              }
            </SButtonContainer>
          </SDesktopListItem>
          <SMobileCard>
            <SCardContent>
              <SCardUserInformation>
                <div>
                  <SCardName onClick={() => handleProfileClick(user.orgId)}>{user.name}</SCardName>
                  <SCardUserStatus status={status}>{APPROVAL_STATUS_ENGLISH_TO_KOREAN[status]}</SCardUserStatus>
                </div>
                <SCardGenerationAndPhone>
                  <div>{user.recentActivity.generation}기</div>
                  <div>{user.phone ? `, ${addHyphenToPhoneNumber(user.phone)}` : ''}</div>
                </SCardGenerationAndPhone>
              </SCardUserInformation>
              <SCardApplicationInformation>
                <SCardDateAndTime>
                  <span>{date}</span>
                  <span>{time}</span>
                </SCardDateAndTime>
              </SCardApplicationInformation>
            </SCardContent>
            <SCardButtonContainer>
              {
                <>
                  {status === 'WAITING' && (
                    <>
                      <SRejectButton
                        disabled={isMutateLoading}
                        onClick={handleChangeApplicationStatus(EApprovalStatus.REJECT)}
                      >
                        거절
                      </SRejectButton>
                      <SApproveButton
                        disabled={isMutateLoading}
                        onClick={handleChangeApplicationStatus(EApprovalStatus.APPROVE)}
                      >
                        승인
                      </SApproveButton>
                    </>
                  )}
                  {status === 'APPROVE' && (
                    <SCancelButton
                      disabled={isMutateLoading}
                      onClick={handleChangeApplicationStatus(EApprovalStatus.WAITING)}
                    >
                      승인 취소
                    </SCancelButton>
                  )}
                  {status === 'REJECT' && (
                    <SCancelButton
                      disabled={isMutateLoading}
                      onClick={handleChangeApplicationStatus(EApprovalStatus.WAITING)}
                    >
                      거절 취소
                    </SCancelButton>
                  )}
                </>
              }
            </SCardButtonContainer>
          </SMobileCard>
        </>
      )}
      {!isHost && (
        <SListItem>
          <SUserInformation>
            <SProfile>
              <SGuestProfileImage>
                {user.profileImage ? <img src={user.profileImage} alt="" /> : <ProfileDefaultIcon />}
              </SGuestProfileImage>
              <SName onClick={() => handleProfileClick(user.orgId)}>{user.name}</SName>
            </SProfile>
            <SVerticalLine />
            <SDate>{date}</SDate>
            <STime>{time}</STime>
          </SUserInformation>
        </SListItem>
      )}
      {isModalOpened && (
        <DefaultModal
          isModalOpened={isModalOpened}
          title={`${APPLICATION_TYPE[type]}내역`}
          handleModalClose={handleModalClose}
        >
          {content ? <SDetailText>{content}</SDetailText> : <SEmptyText>입력한 내용이 없습니다.</SEmptyText>}
        </DefaultModal>
      )}
    </>
  );
};

export default ManagementListItem;

const SListItem = styled('div', {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  borderRadius: '20px',
  backgroundColor: '$gray800',
  padding: '$24',
  minWidth: 'fit-content',
  height: '$80',
  mb: '$16',

  '@media (max-width: 768px)': {
    borderRadius: '8px',
    mb: '$10',
    padding: '$16',
    height: '$56',
  },
});

const SDesktopListItem = styled(SListItem, {
  display: 'flex',

  '@media (max-width: 768px)': {
    display: 'none',
  },
});

const SMobileCard = styled('div', {
  display: 'none',

  '@media (max-width: 768px)': {
    display: 'block',
  },
});

const SCardContent = styled('div', {
  display: 'flex',
  height: '$80',
  padding: '$20',
  backgroundColor: '$gray800',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
});

const SProfileImage = styled('div', {
  width: '$32',
  height: '$32',
  background: '$gray600',
  borderRadius: '$round',
  ml: '$4',
  overflow: 'hidden',
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const SGuestProfileImage = styled(SProfileImage, {
  '@media (max-width: 768px)': {
    width: '$24',
    height: '$24',
    margin: 0,

    svg: {
      width: '$24',
      height: '$24',
    },
  },
});

const SCardUserInformation = styled('div', {
  flex: 1,
  '& > div': {
    flexType: 'verticalCenter',
    '& + &': {
      mt: '$7',
    },
  },
});

const SCardApplicationInformation = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
});

const SUserInformation = styled('div', {
  flexType: 'verticalCenter',
  width: '100%',
});

const SProfile = styled('div', {
  flexType: 'verticalCenter',

  '@media (max-width: 768px)': {
    flex: 1,
  },
});

const SDesktopProfile = styled(SProfile, {
  width: '$163',
});

const SVerticalLine = styled('div', {
  width: '$1',
  height: '$12',
  ml: '$30',
  mr: '$30',
  backgroundColor: '$gray500',

  '@media (max-width: 768px)': {
    display: 'none',
  },
});

const SName = styled('button', {
  ml: '$8',
  color: '$gray10',
  fontAg: '18_semibold_100',
  textDecoration: 'underline',
  textUnderlinePosition: 'under',
  textAlign: 'center',
  minWidth: '$48',

  '@media (max-width: 768px)': {
    fontAg: '14_bold_100',
    minWidth: 'fit-content',
  },
});

const SCardName = styled('button', {
  color: '$gray10',
  fontAg: '14_bold_100',
  textDecoration: 'underline',
  textUnderlinePosition: 'under',
  mr: '$4',
});

const SDateAndTime = styled('div', {
  flexType: 'horizontalCenter',
  width: '$168',
  marginLeft: '$20',
});

const SDate = styled('div', {
  flexType: 'verticalCenter',
  fontAg: '18_semibold_100',

  '@media (max-width: 768px)': {
    fontAg: '12_medium_100',
    color: '$gray400',
    justifyContent: 'space-between',
  },
});

const STime = styled('div', {
  ml: '$8',
  fontAg: '18_semibold_100',
  color: '$gray300',

  '@media (max-width: 768px)': {
    ml: '$4',
    fontAg: '12_medium_100',
    color: '$gray500',
  },
});

const SCardDateAndTime = styled('div', {
  display: 'flex',
  gap: '$4',
  mt: '$13',
  fontAg: '10_medium_100',
  color: '$gray500',
});

const SUserStatus = styled('span', {
  padding: '$4 $5',
  ml: '$10',
  borderRadius: '4px',
  fontAg: '12_semibold_100',
  backgroundColor: '$gray500',

  variants: {
    status: {
      WAITING: {
        backgroundColor: '$gray500',
      },
      APPROVE: {
        backgroundColor: '$success',
      },
      REJECT: {
        backgroundColor: '$gray600',
      },
    },
  },
});

const SCardUserStatus = styled(SUserStatus, {
  ml: '$0',
  padding: '$3 $5 $4 $5',
  fontAg: '10_bold_100',
});

const SGeneration = styled('div', {
  width: '$166',
  textAlign: 'center',
});

const SCardGenerationAndPhone = styled('div', {
  mt: '$8',
  fontAg: '12_medium_100',
  color: '$gray300',
  whiteSpace: 'pre',
});

const SPhone = styled('div', {
  width: '$166',
  textAlign: 'center',
});

const SButtonContainer = styled('div', {
  mr: '$8',
  minWidth: 'fit-content',
});

const SCardButtonContainer = styled('div', {
  flexType: 'verticalCenter',
  mb: '$16',
});

const SRoundButton = styled('button', {
  color: '$gray10',
  borderRadius: '32px',
  fontAg: '16_bold_100',
  padding: '$12 $20',
  lineHeight: '$16',

  '&:disabled': {
    opacity: '0.35',
    cursor: 'not-allowed',
  },
});

const SGrayButton = styled(SRoundButton, {
  backgroundColor: '$gray600',
});

const SWhiteButton = styled(SRoundButton, {
  mr: '$8',
  backgroundColor: '$gray10',
  color: '$gray950',
});

const buttonStyles = {
  width: '50%',
  padding: '$13 0',
  textAlign: 'center',
  fontAg: '14_semibold_100',
  color: '$gray400',
  backgroundColor: '$gray800',
  borderTop: '1px solid $gray600',
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '8px',
  variants: {
    isMutateLoading: {
      true: {
        opacity: '0.35',
        cursor: 'not-allowed',
      },
    },
  },
} as const;

const SRejectButton = styled('button', {
  ...buttonStyles,
  borderBottomRightRadius: '0',
});

const SApproveButton = styled('button', {
  ...buttonStyles,
  color: '$gray950',
  backgroundColor: '$gray10',
  borderBottomLeftRadius: '0',
});

const SCancelButton = styled('button', {
  ...buttonStyles,
  width: '100%',
});

const SDetailText = styled('p', {
  backgroundColor: '$gray700',
  margin: '$24',
  padding: '$16',
  borderRadius: '19.711px',
  height: '$200',
  fontAg: '16_medium_150',
  color: '$gray10',
  boxSizing: 'border-box',
  wordBreak: 'break-word',
});

const SEmptyText = styled('p', {
  padding: '$104 0 $124 0',
  fontAg: '20_medium_100',
  textAlign: 'center',
  color: '$gray400',

  '@media (max-width: 768px)': {
    padding: '$100 0',
    fontAg: '14_medium_100',
  },
});
