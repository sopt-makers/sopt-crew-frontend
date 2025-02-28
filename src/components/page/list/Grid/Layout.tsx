import { PropsWithChildren } from 'react';
import { styled } from 'stitches.config';

function GridLayout({ children, mobileType }: PropsWithChildren<{ mobileType: 'list' | 'card' }>) {
  return (
    <StyledGridContainer as="ul" mobileType={mobileType}>
      {children}
    </StyledGridContainer>
  );
}

const StyledGridContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  columnGap: '30px',
  margin: '24px 0 120px 0',
  rowGap: '120px',
  placeItems: 'start center',

  '@laptop': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '@media (max-width: 849px)': {
    gridTemplateColumns: '1fr',
    columnGap: '10px',
  },
  variants: {
    mobileType: {
      list: {
        '@media (max-width: 768px)': {
          margin: '16px 0 40px 0',
          rowGap: '16px',
        },
      },
      card: {
        '@media (max-width: 768px)': {
          alignItems: 'center',
          gridTemplateColumns: 'repeat(3, 1fr)',
          margin: '16px 0 40px 0',
          rowGap: '40px',
          columnGap: '11px',
        },
        '@media (max-width: 550px)': {
          gridTemplateColumns: 'repeat(2, 1fr)',
        },
        '@media (max-width: 359px)': {
          gridTemplateColumns: '1fr',
        },
      },
    },
  },
});

export default GridLayout;
