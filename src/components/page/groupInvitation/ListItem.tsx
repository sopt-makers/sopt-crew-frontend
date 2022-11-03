import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg';
import Image from 'next/image';

interface ListItemProps {
  profileImage?: string;
  name: string;
  date: string;
  status?: 'waiting' | 'accepted' | 'rejected';
  isHost: boolean;
  handleOpenModal: () => void;
}

const ListItem = ({
  profileImage,
  name,
  date,
  status,
  isHost,
  handleOpenModal,
}: ListItemProps) => {
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

  return (
    <SListItem>
      <SLeft>
        {profileImage ? (
          <Image src={profileImage} width="32" height="32" />
        ) : (
          <ProfileDefaultIcon />
        )}
        <SName>{name}</SName>
        <SVerticalLine />
        <SDate>
          {date} 신청
          {isHost && status && (
            <SStatus isRejected={status === 'rejected'}>
              {getStatusText(status)}
            </SStatus>
          )}
        </SDate>
        {isHost && (
          <>
            <SVerticalLine />
            <SDetail onClick={handleOpenModal}>신청내역 상세</SDetail>
          </>
        )}
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
  );
};

export default ListItem;

const SListItem = styled(Box, {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  borderRadius: '19.711px',
  backgroundColor: '$black80',
  padding: '$24 $32 $24 $24',
  mb: '$20',
});

const SLeft = styled(Box, {
  flexType: 'verticalCenter',

  '& img': {
    borderRadius: '$round',
  },
});

const SVerticalLine = styled(Box, {
  width: '$1',
  height: '$12',
  backgroundColor: '$gray100',
});

const SName = styled('button', {
  ml: '$24',
  mr: '$34',
  color: '$white',
  fontWeight: '$bold',
  textDecoration: 'underline',
  textUnderlinePosition: 'under',
});

const SDate = styled(Box, {
  flexType: 'verticalCenter',
  ml: '$32',
  fontAg: '18_medium_100',
});

const SStatus = styled('span', {
  ml: '$8',
  mr: '$28',
  padding: '$4',
  borderRadius: '4px',
  fontAg: '12_semibold_100',
  backgroundColor: '$purple200',

  variants: {
    isRejected: {
      true: {
        backgroundColor: '$gray100',
      },
    },
  },
});

const SDetail = styled('button', {
  color: '$white',
  ml: '$32',
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
