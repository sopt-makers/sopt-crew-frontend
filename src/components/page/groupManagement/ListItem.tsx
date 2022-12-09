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

interface ListItemProps {
  application: ApplicationData;
  isHost: boolean;
  onChangeApplicationStatus: (
    request: Omit<UpdateApplicationRequest, 'id'>
  ) => void;
}

const ListItem = ({
  application,
  isHost,
  onChangeApplicationStatus,
}: ListItemProps) => {
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
      <SListItem>
        <SLeft>
          {isHost && <SType>신청</SType>}
          <SProfile>
            {profileImage ? <img src={profileImage} /> : <ProfileDefaultIcon />}
            <Link href={`${origin}/members?id=${id}`} passHref>
              <SName>{user.name}</SName>
            </Link>
            {isHost && (
              <SStatus status={status}>{APPLY_STATUS[status]}</SStatus>
            )}
          </SProfile>
          {isHost && (
            <SDetailButton onClick={handleModalOpen}>신청 내역</SDetailButton>
          )}
          {!isHost && <SVerticalLine />}
          <SDate>{dateFormat(appliedDate)['YY.MM.DD']}</SDate>
        </SLeft>
        {isHost && (
          <div>
            {status === EApplyStatus.WAITING && (
              <>
                <SHostPurpleButton onClick={handleClickApproveButton}>
                  승인
                </SHostPurpleButton>
                <SHostGrayButton onClick={handleClickRejectButton}>
                  거절
                </SHostGrayButton>
              </>
            )}
            {status === EApplyStatus.APPROVE && (
              <SHostGrayButton onClick={handleClickCancelButton}>
                승인 취소
              </SHostGrayButton>
            )}
            {status === EApplyStatus.REJECT && (
              <SHostGrayButton onClick={handleClickCancelButton}>
                거절 취소
              </SHostGrayButton>
            )}
          </div>
        )}
      </SListItem>
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

export default ListItem;

const SListItem = styled(Box, {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  borderRadius: '19.711px',
  backgroundColor: '$black80',
  padding: '$20',
  height: '$80',
  mb: '$20',
});

const SLeft = styled(Box, {
  flexType: 'verticalCenter',

  '& img': {
    width: '$32',
    height: '$32',
    borderRadius: '$round',
    ml: '$4',
  },

  '& svg': {
    ml: '$4',
  },
});

const SProfile = styled(Box, {
  flexType: 'verticalCenter',
});

const SType = styled(Box, {
  ml: '$17',
  mr: '$38',
  fontAg: '16_bold_100',
});

const SVerticalLine = styled(Box, {
  width: '$1',
  height: '$12',
  ml: '$30',
  mr: '$30',
  backgroundColor: '$gray100',
});

const SName = styled('a', {
  ml: '$16',
  color: '$white',
  fontAg: '18_semibold_100',
  textDecoration: 'underline',
  textUnderlinePosition: 'under',
  textAlign: 'center',
  minWidth: '$48',
});

const SDate = styled(Box, {
  flexType: 'verticalCenter',
  fontAg: '18_semibold_100',
});

const SStatus = styled('span', {
  padding: '$4',
  ml: '$8',
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

const SDetailButton = styled('button', {
  color: '$white',
  textDecoration: 'underline',
  textUnderlinePosition: 'under',
  margin: 'auto $60',
  fontAg: '18_semibold_100',
});

const SHostGrayButton = styled('button', {
  color: '$white',
  borderRadius: '32px',
  fontAg: '16_bold_100',
  padding: '$12 $20',
  backgroundColor: '$black40',
  lineHeight: '$16',
});

const SHostPurpleButton = styled(SHostGrayButton, {
  marginRight: '8.5px',
  backgroundColor: '$purple100',
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
