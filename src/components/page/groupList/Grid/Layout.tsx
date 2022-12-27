import { Box } from '@components/box/Box';
import { PropsWithChildren } from 'react';
import { styled } from 'stitches.config';

function GridLayout({ children }: PropsWithChildren) {
  return <StyledGridContainer as="ul">{children}</StyledGridContainer>;
}

const StyledGridContainer = styled(Box, {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  columnGap: '30px',
  marginTop: '22px',
  rowGap: '120px',
  placeItems: 'start center',

  '@media (max-width: 1250px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '@media (max-width: 850px)': {
    gridTemplateColumns: '1fr',
  },
  '@mobile': {
    gridTemplateColumns: 'repeat(3, 1fr)',
    marginTop: '16px',
    rowGap: '40px',
    columnGap: '11px',
  },
  '@media (max-width:550px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '@media (max-width:375px)': {
    gridTemplateColumns: '1fr',
  },
});

export default GridLayout;
