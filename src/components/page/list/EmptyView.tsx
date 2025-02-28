import { Flex } from '@components/util/layout/Flex';
import { styled } from 'stitches.config';

function EmptyView({ message }: { message: string }) {
  return (
    <Wrapper>
      <Message>{message}</Message>
    </Wrapper>
  );
}

export default EmptyView;

const Wrapper = styled(Flex.Center, {
  height: '820px',
  border: '1px solid $gray600',
  borderRadius: '10px',
  my: '$24',
  '@media (max-width: 768px)': {
    height: '556px',
  },
});

const Message = styled('p', {
  fontAg: '24_medium_100',
  color: '$gray400',
  '@media (max-width: 768px)': {
    fontAg: '16_medium_100',
  },
});
