import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg';
import useModal from '@hooks/useModal';
import DefaultModal from '@components/modal/DefaultModal';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { dateFormat } from '@utils/date';
import { ApplicationData, UpdateApplicationRequest } from 'src/api/meeting';
import { APPLY_STATUS, EApplyStatus } from '@constants/status';
import ArrowMiniIcon from '@assets/svg/arrow_mini.svg';

interface ManagementListItemProps {
  application: ApplicationData;
  isHost: boolean;
  onChangeApplicationStatus: (
    request: Omit<UpdateApplicationRequest, 'id'>
  ) => void;
}

const ManagementListItem = ({
  application,
  isHost,
  onChangeApplicationStatus,
}: ManagementListItemProps) => {
  const [origin, setOrigin] = useState('');
  const { isModalOpened, handleModalOpen, handleModalClose } = useModal();
  const { id, appliedDate, content, status = 0, user } = application;

  // TODO
  const profileImage = '';

  const handleClickCancelButton = () => {
    onChangeApplicationStatus({
      applyId: application.id,
      status: EApplyStatus.WAITING,
    });
  };

  const handleClickApproveButton = () => {
    onChangeApplicationStatus({
      applyId: application.id,
      status: EApplyStatus.APPROVE,
    });
  };

  const handleClickRejectButton = () => {
    onChangeApplicationStatus({
      applyId: application.id,
      status: EApplyStatus.REJECT,
    });
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
              {/* TODO: 나중에 신청/초대로 수정 예정 */}
              <SType>신청</SType>
              <SDesktopProfile>
                {profileImage ? (
                  <img src={profileImage} />
                ) : (
                  <ProfileDefaultIcon />
                )}
                <Link href={`${origin}/members?id=${id}`} passHref>
                  <SName>{user.name}</SName>
                </Link>
                <SUserStatus status={status}>
                  {APPLY_STATUS[status]}
                </SUserStatus>
              </SDesktopProfile>
              {/* TODO: 나중에 신청/초대로 수정 예정 */}
              <SDetailButton onClick={handleModalOpen}>신청 내역</SDetailButton>
              <SDate>{dateFormat(appliedDate)['YY.MM.DD']}</SDate>
            </SUserInformation>
            <SButtonContainer>
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
            </SButtonContainer>
          </SDesktopListItem>
          <SMobileCard>
            <SCardContent>
              <SCardProfileImage>
                {profileImage ? (
                  <img src={profileImage} />
                ) : (
                  <ProfileDefaultIcon />
                )}
              </SCardProfileImage>
              <SCardUserInformation>
                <div>
                  <Link href={`${origin}/members?id=${id}`} passHref>
                    <SCardName>{user.name}</SCardName>
                  </Link>
                  <SCardUserStatus status={status}>
                    {APPLY_STATUS[status]}
                  </SCardUserStatus>
                </div>
                <div>
                  {/* TODO: 나중에 신청/초대로 수정 예정 */}
                  <SCardType>신청</SCardType>
                  <SCardDate>{dateFormat(appliedDate)['YY.MM.DD']}</SCardDate>
                </div>
              </SCardUserInformation>
              <SCardDetailButton onClick={handleModalOpen}>
                {/* TODO: 나중에 신청/초대로 수정 예정 */}
                <span>신청 내역</span>
                <ArrowMiniIcon />
              </SCardDetailButton>
            </SCardContent>
            <SCardButtonContainer>
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
            </SCardButtonContainer>
          </SMobileCard>
        </>
      )}
      {!isHost && (
        <SListItem>
          <SUserInformation>
            <SProfile>
              {profileImage ? (
                <img src={profileImage} />
              ) : (
                <ProfileDefaultIcon />
              )}
              <Link href={`${origin}/members?id=${id}`} passHref>
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
          title="신청내역"
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

const SCardProfileImage = styled(Box, {
  mr: '$10',

  img: {
    width: '$38',
    height: '$38',
  },

  svg: {
    transform: 'scale(1.1875)',
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

  '& img': {
    width: '$32',
    height: '$32',
    borderRadius: '$round',
    ml: '$4',

    '@mobile': {
      width: '$24',
      height: '$24',
      ml: '$0',
    },
  },

  '& svg': {
    '@mobile': {
      transform: 'scale(0.75)',
    },
  },
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
    textDecoration: 'none',
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
