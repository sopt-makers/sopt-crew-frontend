import { Arrow } from '@components/button/Arrow';
import { useRouter } from 'next/router';
import { styled } from 'stitches.config';

function GroupInfo() {
  const router = useRouter();
  return (
    <Container
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        // TODO: id값을 어떻게 넘겨줄지 고민해보기
        router.push(`/detail?id=${89}`);
      }}
    >
      <GroupInfoWrapper>
        <GroupType>스터디</GroupType>
        <GroupName>언젠가 노마드asdkljhq,wmehlkasndmqhjwalkd;lakjd</GroupName>
      </GroupInfoWrapper>
      <Arrow css={{ margin: 0 }} direction="right" size={18} color="$gray200" strokeWidth={1.125} />
    </Container>
  );
}

export default GroupInfo;

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

const GroupInfoWrapper = styled('div', {
  width: '90%',
  display: 'flex',
});

const GroupType = styled('p', {
  color: '$secondary',
  mr: '$6',
});

const GroupName = styled('p', {
  width: '80%',
  color: '$gray30',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  wordBreak: 'break-all',
});
