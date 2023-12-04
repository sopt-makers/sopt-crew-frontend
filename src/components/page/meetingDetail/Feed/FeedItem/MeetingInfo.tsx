import { Arrow } from '@components/button/Arrow';
import { useRouter } from 'next/router';
import { styled } from 'stitches.config';

interface MeetingInfoProps {
  id: number;
  title: string;
  category: string;
}

function MeetingInfo({ id, title, category }: MeetingInfoProps) {
  const router = useRouter();
  return (
    <Container
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        // TODO: id값을 어떻게 넘겨줄지 고민해보기
        router.push(`/detail?id=${id}`);
      }}
    >
      <MeetingInfoWrapper>
        <MeetingType>{category}</MeetingType>
        <MeetingName>{title}</MeetingName>
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
