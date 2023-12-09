import { ampli } from '@/ampli';
import { Arrow } from '@components/button/Arrow';
import { useRouter } from 'next/router';
import { styled } from 'stitches.config';

interface MeetingInfoProps {
  meetingInfo: {
    id: number;
    title: string;
    category: string;
  };
}

function MeetingInfo({ meetingInfo }: MeetingInfoProps) {
  const router = useRouter();
  return (
    <Container
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        ampli.clickFeedCardGroupLabel({ group_id: meetingInfo.id, location: router.pathname });
        router.push(`/detail?id=${meetingInfo.id}`);
      }}
    >
      <MeetingInfoWrapper>
        <MeetingType>{meetingInfo.category}</MeetingType>
        <MeetingName>{meetingInfo.title}</MeetingName>
      </MeetingInfoWrapper>
      <Arrow css={{ margin: 0 }} direction="right" size={18} color="$gray200" strokeWidth={1.125} />
    </Container>
  );
}

export default MeetingInfo;

const Container = styled('div', {
  display: 'flex',
  background: '$gray800',
  borderRadius: '8px',
  height: '46px',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontStyle: 'T5',
  padding: '$0 $12',
  mb: '$20',
  border: '1px solid $gray800',
  '&:hover': {
    border: '1px solid $gray500',
  },
  '@tablet': {
    background: '$gray900',
  },
});

const MeetingInfoWrapper = styled('div', {
  width: '90%',
  display: 'flex',
});

const MeetingType = styled('p', {
  color: '$secondary',
  mr: '$6',
  whiteSpace: 'nowrap',
});

const MeetingName = styled('p', {
  width: '80%',
  color: '$gray30',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  wordBreak: 'break-all',
});
