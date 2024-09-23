import { styled } from 'stitches.config';
import RecommentPointIcon from '@assets/svg/recomment_point_icon.svg';

interface CommentBlockerProps {
  variant?: 'default' | 'secondary';
}
const CommentBlocker = ({ variant = 'default' }: CommentBlockerProps) => {
  return (
    <Container variant={variant}>
      {variant == 'secondary' && <RecommentPointIcon style={{ marginRight: '12px' }} />}
      <BlockerMessage>차단된 멤버의 댓글입니다.</BlockerMessage>
    </Container>
  );
};

export default CommentBlocker;

const Container = styled('div', {
  display: 'flex',
  variants: {
    variant: {
      default: {
        paddingLeft: '$40',
      },
      secondary: {
        paddingLeft: '$16',
        '@tablet': {
          paddingLeft: '$12',
        },
      },
    },
  },
});

const BlockerMessage = styled('p', {
  fontAg: '16_medium_150',
  color: '$gray500',

  '@tablet': {
    fontAg: '14_medium_100',
  },
});
