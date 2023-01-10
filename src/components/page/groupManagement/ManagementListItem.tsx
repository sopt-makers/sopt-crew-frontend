import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import useModal from '@hooks/useModal';
import DefaultModal from '@components/modal/DefaultModal';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { dateFormat } from '@utils/date';
import { ApplicationData, UpdateApplicationRequest } from 'src/api/meeting';
import { APPLY_STATUS, APPLY_TYPE, EApplyStatus } from '@constants/status';
import ArrowMiniIcon from '@assets/svg/arrow_mini.svg';
import {
  useMutationUpdateApplication,
  useMutationDeleteInvitation,
} from 'src/api/meeting/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { SyncLoader } from 'react-spinners';

interface ManagementListItemProps {
  groupId: number;
  application: ApplicationData;
  isHost: boolean;
}

const ManagementListItem = ({
  groupId,
  application,
  isHost,
}: ManagementListItemProps) => {
  const [origin, setOrigin] = useState('');
  const { isModalOpened, handleModalOpen, handleModalClose } = useModal();
  const { appliedDate, content, status = 0, user, type } = application;

  const { mutateAsync: mutateUpdateApplication } = useMutationUpdateApplication(
    {}
  );
  const { mutateAsync: mutateDeleteInvitation } = useMutationDeleteInvitation(
    {}
  );
  const queryClient = useQueryClient();
  const [isMutateLoading, setIsMutateLoading] = useState(false);

  const handleChangeApplicationStatus = async (
    request: Omit<UpdateApplicationRequest, 'id'>
  ) => {
    setIsMutateLoading(true);
    await mutateUpdateApplication({ id: groupId, ...request });
    await queryClient.invalidateQueries({
      queryKey: ['getGroupPeopleList'],
    });
    setIsMutateLoading(false);
  };

  const handleClickCancelButton = () => {
    handleChangeApplicationStatus({
      applyId: application.id,
      status: EApplyStatus.WAITING,
    });
  };

  const handleClickApproveButton = () => {
    handleChangeApplicationStatus({
      applyId: application.id,
      status: EApplyStatus.APPROVE,
    });
  };

  const handleClickRejectButton = () => {
    handleChangeApplicationStatus({
      applyId: application.id,
      status: EApplyStatus.REJECT,
    });
  };

  const handleCancelInvitation = async () => {
    setIsMutateLoading(true);
    await mutateDeleteInvitation({ id: groupId, inviteId: application.id });
    await queryClient.invalidateQueries({
      queryKey: ['getGroupPeopleList'],
    });
    setIsMutateLoading(false);
  };
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <>
      {isHost && (
        <>
          <SDesktopListItem>
            <SUserInformation>
              <SType>{APPLY_TYPE[type]}</SType>
              <SDesktopProfile>
                <SProfileImage>
                  {user.profileImage ? (
                    <img src={user.profileImage} alt="" />
                  ) : (
                    <ProfileDefaultIcon />
                  )}
                </SProfileImage>

                <Link href={`${origin}/members?id=${user.orgId}`} passHref>
                  <SName>{user.name}</SName>
                </Link>
                <SUserStatus status={status}>
                  {APPLY_STATUS[status]}
                </SUserStatus>
              </SDesktopProfile>
              <SDetailButton onClick={handleModalOpen}>
                {APPLY_TYPE[type]} 내역
              </SDetailButton>
              <SDate>{dateFormat(appliedDate)['YY.MM.DD']}</SDate>
            </SUserInformation>
            <SButtonContainer>
              {isMutateLoading ? (
                <SyncLoader color="#8040ff" />
              ) : (
                <>
                  {type === 0 && (
                    <>
                      {status === EApplyStatus.WAITING && (
                        <>
                          <SPurpleButton onClick={handleClickApproveButton}>
                            승인
                          </SPurpleButton>
                          <SGrayButton onClick={handleClickRejectButton}>
                            거절
                          </SGrayButton>
                        </>
                      )}
                      {status === EApplyStatus.APPROVE && (
                        <SGrayButton onClick={handleClickCancelButton}>
                          승인 취소
                        </SGrayButton>
                      )}
                      {status === EApplyStatus.REJECT && (
                        <SGrayButton onClick={handleClickCancelButton}>
                          거절 취소
                        </SGrayButton>
                      )}
                    </>
                  )}
                  {type === 1 && (
                    <SGrayButton onClick={handleCancelInvitation}>
                      초대 취소
                    </SGrayButton>
                  )}
                </>
              )}
            </SButtonContainer>
          </SDesktopListItem>
          <SMobileCard>
            <SCardContent>
              <SProfileImage>
                {user.profileImage ? (
                  <img src={user.profileImage} alt="" />
                ) : (
                  <ProfileDefaultIcon />
                )}
              </SProfileImage>
              <SCardUserInformation>
                <div>
                  <Link href={`${origin}/members?id=${user.orgId}`} passHref>
                    <SCardName>{user.name}</SCardName>
                  </Link>
                  <SCardUserStatus status={status}>
                    {APPLY_STATUS[status]}
                  </SCardUserStatus>
                </div>
                <div>
                  <SCardType>{APPLY_TYPE[type]}</SCardType>
                  <SCardDate>{dateFormat(appliedDate)['YY.MM.DD']}</SCardDate>
                </div>
              </SCardUserInformation>
              <SCardDetailButton onClick={handleModalOpen}>
                <span>{APPLY_TYPE[type]} 내역</span>
                <ArrowMiniIcon />
              </SCardDetailButton>
            </SCardContent>
            <SCardButtonContainer>
              {isMutateLoading ? (
                <SCancelButton disabled>
                  <SyncLoader color="#8040ff" />
                </SCancelButton>
              ) : (
                <>
                  {type === 0 && (
                    <>
                      {status === EApplyStatus.WAITING && (
                        <>
                          <SRejectButton onClick={handleClickRejectButton}>
                            거절
                          </SRejectButton>
                          <SApproveButton onClick={handleClickApproveButton}>
                            승인
                          </SApproveButton>
                        </>
                      )}
                      {status === EApplyStatus.APPROVE && (
                        <SCancelButton onClick={handleClickCancelButton}>
                          승인 취소
                        </SCancelButton>
                      )}
                      {status === EApplyStatus.REJECT && (
                        <SCancelButton onClick={handleClickCancelButton}>
                          거절 취소
                        </SCancelButton>
                      )}
                    </>
                  )}
                  {type === 1 && (
                    <SCancelButton onClick={handleCancelInvitation}>
                      초대 취소
                    </SCancelButton>
                  )}
                </>
              )}
            </SCardButtonContainer>
          </SMobileCard>
        </>
      )}
      {!isHost && (
        <SListItem>
          <SUserInformation>
            <SProfile>
              <SProfileImage>
                {user.profileImage ? (
                  <img src={user.profileImage} alt="" />
                ) : (
                  <ProfileDefaultIcon />
                )}
              </SProfileImage>

              <Link href={`${origin}/members?id=${user.orgId}`} passHref>
                <SName>{user.name}</SName>
              </Link>
            </SProfile>
            <SVerticalLine />
            <SDate>{dateFormat(appliedDate)['YY.MM.DD']}</SDate>
          </SUserInformation>
        </SListItem>
      )}
      {isModalOpened && (
        <DefaultModal
          isModalOpened={isModalOpened}
          title={`${APPLY_TYPE[type]}내역`}
          handleModalClose={handleModalClose}
        >
          <SDetailText>{content}</SDetailText>
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
  padding: '$20 $32',
  height: '$80',
  mb: '$20',

  '@mobile': {
    borderRadius: '8px',
    mb: '$10',
    padding: '$16',
    height: '$56',
  },
});

const SDesktopListItem = styled(SListItem, {
  display: 'flex',

  '@mobile': {
    display: 'none',
  },
});

const SMobileCard = styled(Box, {
  display: 'none',

  '@mobile': {
    display: 'block',
  },
});

const SCardContent = styled(Box, {
  display: 'flex',
  height: '$80',
  padding: '$21 $16',
  backgroundColor: '$black80',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
});

const SProfileImage = styled(Box, {
  width: '$32',
  height: '$32',
  borderRadius: '$round',
  ml: '$4',
  overflow: 'hidden',
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  '@mobile': {
    mr: '$10',
    width: '$38',
    height: '$38',

    svg: {
      width: '100%',
      height: '100%',
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

const SUserInformation = styled(Box, {
  flexType: 'verticalCenter',
  width: '100%',
});

const SProfile = styled(Box, {
  flexType: 'verticalCenter',

  '@mobile': {
    flex: 1,
  },
});

const SDesktopProfile = styled(SProfile, {
  width: '$244',
});

const SType = styled(Box, {
  mr: '$32',
  fontAg: '16_bold_100',
});

const SCardType = styled(Box, {
  mr: '$4',
  fontAg: '12_bold_100',
  color: '$gray60',
});

const SVerticalLine = styled(Box, {
  width: '$1',
  height: '$12',
  ml: '$30',
  mr: '$30',
  backgroundColor: '$gray100',

  '@mobile': {
    display: 'none',
  },
});

const SName = styled('a', {
  ml: '$8',
  color: '$white',
  fontAg: '18_semibold_100',
  textDecoration: 'underline',
  textUnderlinePosition: 'under',
  textAlign: 'center',
  minWidth: '$48',

  '@mobile': {
    fontAg: '14_bold_100',
    minWidth: 'fit-content',
  },
});

const SCardName = styled('a', {
  fontAg: '14_bold_100',
  mr: '$4',
});

const SDate = styled(Box, {
  flexType: 'verticalCenter',
  fontAg: '18_semibold_100',

  '@mobile': {
    fontAg: '12_medium_100',
    color: '$gray80',
    justifyContent: 'space-between',
  },
});

const SCardDate = styled(Box, {
  fontAg: '12_medium_100',
  color: '$gray80',
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
        backgroundColor: '$black20',
      },
    },
  },
});

const SCardUserStatus = styled(SUserStatus, {
  ml: '$0',
  padding: '$3 $5 $4 $5',
  fontAg: '10_bold_100',
});

const SDetailButton = styled('button', {
  color: '$white',
  textDecoration: 'underline',
  textUnderlinePosition: 'under',
  mr: '$66',
  fontAg: '18_semibold_100',
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
  minWidth: 'fit-content',
});

const SCardButtonContainer = styled(Box, {
  flexType: 'verticalCenter',
  mb: '$16',
});

const SGrayButton = styled('button', {
  color: '$white',
  borderRadius: '32px',
  fontAg: '16_bold_100',
  padding: '$12 $20',
  backgroundColor: '$black40',
  lineHeight: '$16',
});

const SPurpleButton = styled(SGrayButton, {
  marginRight: '8.5px',
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
});

const SRejectButton = styled(SCardButton, {
  borderBottomRightRadius: '0',
});

const SApproveButton = styled(SCardButton, {
  color: '$white',
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
  color: '$white',
  boxSizing: 'border-box',
});
