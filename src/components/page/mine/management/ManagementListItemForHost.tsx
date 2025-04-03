import { ampli } from '@/ampli';
import { useMutationUpdateApplication } from '@api/API_LEGACY/meeting/hooks';
import { MeetingPeopleResponse } from '@api/meeting';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import DefaultModal from '@components/modal/DefaultModal';
import {
  navigateToUserProfileWithTracking,
  SDate,
  SListItem,
  SName,
  SProfile,
  SProfileImage,
  STime,
  SUserInformation,
} from '@components/page/mine/management/ManagementListItem';
import { APPLICATION_TYPE, APPROVAL_STATUS_ENGLISH_TO_KOREAN, EApprovalStatus } from '@constants/option';
import useModal from '@hooks/useModal';
import { useQueryClient } from '@tanstack/react-query';
import alertErrorMessage from '@utils/alertErrorMessage';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { useState } from 'react';
import { styled } from 'stitches.config';

type ManagementListItemForHostProps = {
  meetingId: number;
  application: MeetingPeopleResponse['apply'][number];
};
const ManagementListItemForHost = ({ meetingId, application }: ManagementListItemForHostProps) => {
  const { appliedDate, content = '', status = 'WAITING', user, type, applyNumber } = application;
  const date = dayjs(appliedDate).format('YY.MM.DD');
  const time = dayjs(appliedDate).format('HH:mm:ss');

  const { mutateAsync: mutateUpdateApplication } = useMutationUpdateApplication({});
  const queryClient = useQueryClient();
  const [isMutateLoading, setIsMutateLoading] = useState(false);
  const { isModalOpened, handleModalOpen, handleModalClose } = useModal();
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
      <SDesktopListItem>
        <SUserInformation>
          <SDesktopProfile>
            <SProfileImage>
              {user.profileImage ? <img src={user.profileImage} alt="" /> : <ProfileDefaultIcon />}
            </SProfileImage>
            <SName onClick={() => navigateToUserProfileWithTracking(user.orgId)}>{user.name}</SName>
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
              <SCardName onClick={() => navigateToUserProfileWithTracking(user.orgId)}>{user.name}</SCardName>
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

export default ManagementListItemForHost;

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

const SDesktopProfile = styled(SProfile, {
  width: '$163',
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

const SGrayButton = styled(SRoundButton, {
  backgroundColor: '$gray600',
});

const SWhiteButton = styled(SRoundButton, {
  mr: '$8',
  backgroundColor: '$gray10',
  color: '$gray950',
});

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
