import { ampli } from '@/ampli';
import { Arrow } from '@common/button/Arrow';
import { CATEGORY_OPTIONS } from '@constant/option';
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
        <MeetingType isStudy={meetingInfo.category === CATEGORY_OPTIONS[0]}>{meetingInfo.category}</MeetingType>
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
  '@media (max-width: 768px)': {
    background: '$gray900',
  },
});

const MeetingInfoWrapper = styled('div', {
  width: '90%',
  display: 'flex',
});

const MeetingType = styled('p', {
  mr: '$6',
  whiteSpace: 'nowrap',
  variants: {
    isStudy: {
      true: { color: '$secondary' },
      false: { color: '$success' },
    },
  },
});

const MeetingName = styled('p', {
  width: '80%',
  color: '$gray30',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  wordBreak: 'break-all',
});
