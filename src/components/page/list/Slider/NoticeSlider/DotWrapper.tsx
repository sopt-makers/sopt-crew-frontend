import { Flex } from '@components/util/layout/Flex';
import { styled } from 'stitches.config';

export default function DotWrapper(dots: React.ReactNode) {
  return (
    <SDotWrapper justify="center" align="center">
      {dots}
    </SDotWrapper>
  );
}

const SDotWrapper = styled(Flex, {
  marginTop: '20px',
  gap: '4px',
  '@mobile': {
    display: 'none',
  },
});
