import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';
import ProfileDefault from '@assets/svg/profile_default.svg';

interface ListItemProps {
  isHost: boolean;
  status?: 'waiting' | 'accepted' | 'rejected';
}

const ListItem = ({ isHost, status }: ListItemProps) => {
  // 임시
  const name = '김인우';
  const date = '22.10.04';

  const getStatusText = (statusText: string) => {
    switch (statusText) {
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
        <ProfileDefault />
        <SName>{name}</SName>
        <SVerticalLine />
        <SDate>
          {date} 신청
          {isHost && status && <SStatus>{getStatusText(status)}</SStatus>}
        </SDate>
        {isHost && (
          <>
            <SVerticalLine />
            <SDetail>신청내역 상세</SDetail>
          </>
        )}
      </SLeft>
      {isHost && (
        <div>
          {status === 'waiting' && (
            <>
              <HostPurpleButton>승인</HostPurpleButton>
              <HostGrayButton>거절</HostGrayButton>
            </>
          )}
          {status === 'accepted' && <HostGrayButton>승인 취소</HostGrayButton>}
          {status === 'rejected' && <HostGrayButton>거절 취소</HostGrayButton>}
        </div>
      )}
    </SListItem>
  );
};

export default ListItem;

const SListItem = styled(Box, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '19.711px',
  backgroundColor: '$black80',
  padding: '$24 $32 $24 $32',
});

const SLeft = styled(Box, {
  display: 'flex',
  alignItems: 'center',
});

const SVerticalLine = styled(Box, {
  width: '$1',
  height: '$12',
  backgroundColor: '$gray100',
});

const SName = styled('button', {
  marginLeft: '$24',
  marginRight: '$34',
  color: '$white',
  fontWeight: '$bold',
  textDecoration: 'underline',
  textUnderlinePosition: 'under',
});

const SDate = styled(Box, {
  display: 'flex',
  alignItems: 'center',
  marginLeft: '$32',
  fontAg: '18_medium_100',
});

const SStatus = styled('span', {
  marginLeft: '$8',
  marginRight: '$28',
  padding: '$4',
  borderRadius: '4px',
  fontAg: '12_semibold_100',
  backgroundColor: '$purple200',

  variants: {
    status: {
      rejected: {
        backgroundColor: '$gray100',
      },
    },
  },
});

const SDetail = styled('button', {
  color: '$white',
  marginLeft: '$32',
  textDecoration: 'underline',
  textUnderlinePosition: 'under',
});

const HostGrayButton = styled('button', {
  color: '$white',
  borderRadius: '32px',
  fontAg: '16_bold_100',
  padding: '$12 $20',
  backgroundColor: '$black40',
});

const HostPurpleButton = styled(HostGrayButton, {
  marginRight: '8.5px',
  backgroundColor: '$purple100',
});
