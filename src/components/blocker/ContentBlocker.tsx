import { styled } from 'stitches.config';

const ContentBlocker = () => {
  return (
    <Container>
      <BlockerMessage>차단된 멤버의 게시글입니다.</BlockerMessage>
    </Container>
  );
};

export default ContentBlocker;

const Container = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  padding: '$20 $20 $28 $20',
  height: '180px',
  width: '380px',

  background: '$gray900',
  borderRadius: '12px',

  '@media (max-width: 768px)': {
    padding: '$24 0 $28 0',
    background: 'transparent',
    borderRadius: 0,
    margin: '0 auto',
  },
});

const BlockerMessage = styled('p', {
  fontAg: '14_semibold_100',
  color: '$gray500',
});
