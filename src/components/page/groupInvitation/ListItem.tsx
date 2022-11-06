import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg';
import Image from 'next/image';
import useModal from '@hooks/useModal';
import DefaultModal from '@components/modal/DefaultModal';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ListItemProps {
  id: number;
  profileImage?: string;
  name: string;
  date: string;
  status?: 'waiting' | 'accepted' | 'rejected';
  detail?: string;
  isHost: boolean;
}

const ListItem = ({
  id,
  profileImage,
  name,
  date,
  status,
  detail,
  isHost,
}: ListItemProps) => {
  const [host, setHost] = useState('');
  const { isModalOpened, handleModalOpen, handleModalClose } = useModal();
  const getStatusText = (status: string) => {
    switch (status) {
      case 'waiting':
        return '대기';
      case 'accepted':
        return '승인';
      case 'rejected':
        return '거절';
    }
  };

  useEffect(() => {
    setHost(window.location.host);
  }, []);

  return (
    <>
      <SListItem>
        <SLeft>
          {profileImage ? (
            <Image src={profileImage} width="32" height="32" />
          ) : (
            <ProfileDefaultIcon />
          )}
          <Link href={`${host}/members/detail?memberId=${id}`} passHref>
            <SName>{name}</SName>
          </Link>
          {isHost && status && (
            <SStatus isAccepted={status === 'accepted'}>
              {getStatusText(status)}
            </SStatus>
          )}
          {isHost && (
            <>
              <SVerticalLine />
              <SDetailButton onClick={handleModalOpen}>신청내역</SDetailButton>
            </>
          )}
          <SVerticalLine />
          <SDate>{date}</SDate>
        </SLeft>
        {isHost && (
          <div>
            {status === 'waiting' && (
              <>
                <SHostPurpleButton>승인</SHostPurpleButton>
                <SHostGrayButton>거절</SHostGrayButton>
              </>
            )}
            {status === 'accepted' && (
              <SHostGrayButton>승인 취소</SHostGrayButton>
            )}
            {status === 'rejected' && (
              <SHostGrayButton>거절 취소</SHostGrayButton>
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
          <SDetailText>{detail}</SDetailText>
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
