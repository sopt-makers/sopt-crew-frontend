import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg';
import useModal from '@hooks/useModal';
import DefaultModal from '@components/modal/DefaultModal';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { dateFormat } from '@utils/date';
import { ApplicationData } from 'src/api/meeting';

interface ListItemProps {
  application: ApplicationData;
  isHost: boolean;
}

const ListItem = ({ application, isHost }: ListItemProps) => {
  const [origin, setOrigin] = useState('');
  const { isModalOpened, handleModalOpen, handleModalClose } = useModal();
  const { id, appliedDate, content, status, user } = application;
  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return '대기';
      case 1:
        return '승인';
      case 2:
        return '거절';
    }
  };
  // TODO
  const profileImage = '';

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <>
      <SListItem>
        <SLeft>
          {profileImage ? <img src={profileImage} /> : <ProfileDefaultIcon />}
          <Link href={`${origin}/members/detail?memberId=${id}`} passHref>
            <SName>{user.name}</SName>
          </Link>
          {isHost && status >= 0 && (
            <SStatus isAccepted={status === 1}>{getStatusText(status)}</SStatus>
          )}
          {isHost && (
            <>
              <SVerticalLine />
              <SDetailButton onClick={handleModalOpen}>신청내역</SDetailButton>
            </>
          )}
          <SVerticalLine />
          <SDate>{dateFormat(appliedDate)['YY.MM.DD']}</SDate>
        </SLeft>
        {isHost && (
          <div>
            {status === 0 && (
              <>
                <SHostPurpleButton>승인</SHostPurpleButton>
                <SHostGrayButton>거절</SHostGrayButton>
              </>
            )}
            {status === 1 && <SHostGrayButton>승인 취소</SHostGrayButton>}
            {status === 2 && <SHostGrayButton>거절 취소</SHostGrayButton>}
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

const SVerticalLine = styled(Box, {
  width: '$1',
  height: '$12',
  ml: '$30',
  mr: '$30',
  backgroundColor: '$gray100',
});

const SName = styled('a', {
  ml: '$24',
  color: '$white',
  fontWeight: '$bold',
  textDecoration: 'underline',
  textUnderlinePosition: 'under',
});

const SDate = styled(Box, {
  flexType: 'verticalCenter',
  fontAg: '18_medium_100',
});

const SStatus = styled('span', {
  padding: '$4',
  ml: '$8',
  borderRadius: '4px',
  fontAg: '12_semibold_100',
  backgroundColor: '$gray100',

  variants: {
    isAccepted: {
      true: {
        backgroundColor: '$purple200',
      },
    },
  },
});

const SDetailButton = styled('button', {
  color: '$white',
  textDecoration: 'underline',
  textUnderlinePosition: 'under',
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
