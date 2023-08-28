import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { styled } from 'stitches.config';
import useModal from '@hooks/useModal';
import { Box } from '@components/box/Box';
import DefaultModal from '@components/modal/DefaultModal';
import { ApplicationData } from '@api/meeting';
import { useMutationUpdateApplication } from '@api/meeting/hooks';
import { APPROVAL_STATUS, APPLICATION_TYPE, EApprovalStatus } from '@constants/option';
import { playgroundLink } from '@sopt-makers/playground-common';
import ArrowMiniIcon from '@assets/svg/arrow_mini.svg';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import dayjs from 'dayjs';
import { AxiosError } from 'axios';
import alertErrorMessage from '@utils/alertErrorMessage';

interface ManagementListItemProps {
  meetingId: number;
  application: ApplicationData;
  isHost: boolean;
}

const ManagementListItem = ({ meetingId, application, isHost }: ManagementListItemProps) => {
  const { appliedDate, content = '', status = 0, user, type } = application;
  const date = dayjs(appliedDate).format('YY.MM.DD');
  const time = dayjs(appliedDate).format('HH:mm:ss');
  const { isModalOpened, handleModalOpen, handleModalClose } = useModal();
  const { mutateAsync: mutateUpdateApplication } = useMutationUpdateApplication({});
  const queryClient = useQueryClient();
  const [isMutateLoading, setIsMutateLoading] = useState(false);

  const moveToMemberDetailPage = (id: string) => {
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
                <SName onClick={() => moveToMemberDetailPage(user.orgId)}>{user.name}</SName>
                <SUserStatus status={status}>{APPROVAL_STATUS[status]}</SUserStatus>
              </SDesktopProfile>
              <SGeneration>{user.activities[0].generation}기</SGeneration>
              <SPhone>{user.phone ? addHyphenToPhoneNumber(user.phone) : '-'}</SPhone>
              <SDetailButton onClick={handleModalOpen}>{APPLICATION_TYPE[type]} 내역</SDetailButton>
              <SDateAndTime>
                <SDate>{date}</SDate>
                <STime>{time}</STime>
              </SDateAndTime>
            </SUserInformation>
            <SButtonContainer>
              {
                <>
                  {status === EApprovalStatus.WAITING && (
                    <>
                      <SPurpleButton
                        disabled={isMutateLoading}
                        onClick={handleChangeApplicationStatus(EApprovalStatus.APPROVE)}
                      >
                        승인
                      </SPurpleButton>
                      <SGrayButton
                        disabled={isMutateLoading}
                        onClick={handleChangeApplicationStatus(EApprovalStatus.REJECT)}
                      >
                        거절
                      </SGrayButton>
                    </>
                  )}
                  {status === EApprovalStatus.APPROVE && (
                    <SGrayButton
                      disabled={isMutateLoading}
                      onClick={handleChangeApplicationStatus(EApprovalStatus.WAITING)}
                    >
                      승인 취소
                    </SGrayButton>
                  )}
                  {status === EApprovalStatus.REJECT && (
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
                  <SCardName onClick={() => moveToMemberDetailPage(user.orgId)}>{user.name}</SCardName>
                  <SCardUserStatus status={status}>{APPROVAL_STATUS[status]}</SCardUserStatus>
                </div>
                <SCardGenerationAndPhone>
                  <div>{user.activities[0].generation}기</div>
                  <div>{user.phone ? `, ${addHyphenToPhoneNumber(user.phone)}` : ''}</div>
                </SCardGenerationAndPhone>
              </SCardUserInformation>
              <SCardApplicationInformation>
                <SCardDetailButton onClick={handleModalOpen}>
                  <span>{APPLICATION_TYPE[type]} 내역</span>
                  <ArrowMiniIcon />
                </SCardDetailButton>
                <SCardDateAndTime>
                  <span>{date}</span>
                  <span>{time}</span>
                </SCardDateAndTime>
              </SCardApplicationInformation>
            </SCardContent>
            <SCardButtonContainer>
              {
                <>
                  {status === EApprovalStatus.WAITING && (
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
                  {status === EApprovalStatus.APPROVE && (
                    <SCancelButton
                      disabled={isMutateLoading}
                      onClick={handleChangeApplicationStatus(EApprovalStatus.WAITING)}
                    >
                      승인 취소
                    </SCancelButton>
                  )}
                  {status === EApprovalStatus.REJECT && (
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
              <SName onClick={() => moveToMemberDetailPage(user.orgId)}>{user.name}</SName>
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

const SListItem = styled(Box, {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  borderRadius: '20px',
  backgroundColor: '$black80',
  padding: '$24',
  minWidth: 'fit-content',
  height: '$80',
  mb: '$16',

  '@tablet': {
    borderRadius: '8px',
    mb: '$10',
    padding: '$16',
    height: '$56',
  },
});

const SDesktopListItem = styled(SListItem, {
  display: 'flex',

  '@tablet': {
    display: 'none',
  },
});

const SMobileCard = styled(Box, {
  display: 'none',

  '@tablet': {
    display: 'block',
  },
});

const SCardContent = styled(Box, {
  display: 'flex',
  height: '$80',
  padding: '$20',
  backgroundColor: '$black80',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
});

const SProfileImage = styled(Box, {
  width: '$32',
  height: '$32',
  background: '$black40',
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
  '@tablet': {
    width: '$24',
    height: '$24',
    margin: 0,

    svg: {
      width: '$24',
      height: '$24',
    },
  },
});

const SCardUserInformation = styled(Box, {
  flex: 1,
  '& > div': {
    flexType: 'verticalCenter',
    '& + &': {
      mt: '$7',
    },
  },
});

const SCardApplicationInformation = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
});

const SUserInformation = styled(Box, {
  flexType: 'verticalCenter',
  width: '100%',
});

const SProfile = styled(Box, {
  flexType: 'verticalCenter',

  '@tablet': {
    flex: 1,
  },
});

const SDesktopProfile = styled(SProfile, {
  width: '$163',
});

const SVerticalLine = styled(Box, {
  width: '$1',
  height: '$12',
  ml: '$30',
  mr: '$30',
  backgroundColor: '$gray100',

  '@tablet': {
    display: 'none',
  },
});

const SName = styled('button', {
  ml: '$8',
  color: '$white100',
  fontAg: '18_semibold_100',
  textDecoration: 'underline',
  textUnderlinePosition: 'under',
  textAlign: 'center',
  minWidth: '$48',

  '@tablet': {
    fontAg: '14_bold_100',
    minWidth: 'fit-content',
  },
});

const SCardName = styled('button', {
  color: '$white100',
  fontAg: '14_bold_100',
  textDecoration: 'underline',
  textUnderlinePosition: 'under',
  mr: '$4',
});

const SDateAndTime = styled(Box, {
  flexType: 'horizontalCenter',
  width: '$168',
});

const SDate = styled(Box, {
  flexType: 'verticalCenter',
  fontAg: '18_semibold_100',

  '@tablet': {
    fontAg: '12_medium_100',
    color: '$gray80',
    justifyContent: 'space-between',
  },
});

const STime = styled(Box, {
  ml: '$8',
  fontAg: '18_semibold_100',
  color: '$gray60',

  '@tablet': {
    ml: '$4',
    fontAg: '12_medium_100',
    color: '$gray100',
  },
});

const SCardDateAndTime = styled(Box, {
  display: 'flex',
  gap: '$4',
  mt: '$13',
  fontAg: '10_medium_100',
  color: '$gray100',
});

const SUserStatus = styled('span', {
  padding: '$4 $5',
  ml: '$10',
  borderRadius: '4px',
  fontAg: '12_semibold_100',
  backgroundColor: '$gray100',

  variants: {
    status: {
      0: {
        backgroundColor: '$gray100',
      },
      1: {
        backgroundColor: '$purple100',
      },
      2: {
        backgroundColor: '$black40',
      },
    },
  },
});

const SCardUserStatus = styled(SUserStatus, {
  ml: '$0',
  padding: '$3 $5 $4 $5',
  fontAg: '10_bold_100',
});

const SGeneration = styled(Box, {
  width: '$166',
  textAlign: 'center',
});

const SCardGenerationAndPhone = styled(Box, {
  mt: '$8',
  fontAg: '12_medium_100',
  color: '$gray60',
  whiteSpace: 'pre',
});

const SPhone = styled(Box, {
  width: '$166',
  textAlign: 'center',
});

const SDetailButton = styled('button', {
  color: '$white100',
  textDecoration: 'underline',
  textUnderlinePosition: 'under',
  fontAg: '18_semibold_100',
  width: '$216',
  textAlign: 'center',
});

const SCardDetailButton = styled('button', {
  display: 'flex',
  justifyContent: 'flex-start',
  mt: '$3',
  height: 'fit-content',
  fontAg: '12_medium_100',
  color: '$gray80',

  '& > span': {
    mr: '$2',
  },
});

const SButtonContainer = styled(Box, {
  mr: '$8',
  minWidth: 'fit-content',
});

const SCardButtonContainer = styled(Box, {
  flexType: 'verticalCenter',
  mb: '$16',
});

const SRoundButton = styled('button', {
  color: '$white100',
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
  backgroundColor: '$black40',
});

const SPurpleButton = styled(SRoundButton, {
  mr: '$8',
  backgroundColor: '$purple100',
});

const SCardButton = styled('button', {
  width: '50%',
  padding: '$13 0',
  textAlign: 'center',
  fontAg: '14_semibold_100',
  color: '$gray80',
  backgroundColor: '$black80',
  borderTop: '1px solid $black40',
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
});

const SRejectButton = styled(SCardButton, {
  borderBottomRightRadius: '0',
});

const SApproveButton = styled(SCardButton, {
  color: '$white100',
  backgroundColor: '$purple100',
  borderBottomLeftRadius: '0',
});

const SCancelButton = styled(SCardButton, {
  width: '100%',
});

const SDetailText = styled('p', {
  backgroundColor: '$black60',
  margin: '$24',
  padding: '$16',
  borderRadius: '19.711px',
  height: '$200',
  fontAg: '16_medium_150',
  color: '$white100',
  boxSizing: 'border-box',
  wordBreak: 'break-word',
});

const SEmptyText = styled('p', {
  padding: '$104 0 $124 0',
  fontAg: '20_medium_100',
  textAlign: 'center',
  color: '$gray80',

  '@tablet': {
    padding: '$100 0',
    fontAg: '14_medium_100',
  },
});
