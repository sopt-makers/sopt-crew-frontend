import { Children, PropsWithChildren } from 'react';
import { styled } from 'stitches.config';

export default function AvatarGroup({ children }: PropsWithChildren) {
  return (
    <SContainer>
      {Children.map(children, (child, index) => (
        <SAvatarWrapper key={index}>{child}</SAvatarWrapper>
      ))}
    </SContainer>
  );
}

const SContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
});
const SAvatarWrapper = styled('div', {
  '&:not(:first-child)': {
    marginLeft: '-16px',
  },
  '& > div': {
    border: '3px solid #171818',
  },
});
