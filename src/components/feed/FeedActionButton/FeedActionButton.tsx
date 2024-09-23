import { PropsWithChildren, forwardRef } from 'react';
import { styled } from 'stitches.config';
import { fontsObject } from '@sopt-makers/fonts';

type FeedActionButtonProps = React.HTMLAttributes<HTMLButtonElement>;

const FeedActionButton = forwardRef<HTMLButtonElement, PropsWithChildren<FeedActionButtonProps>>(
  ({ children, ...rest }, ref) => {
    return (
      <MenuItem ref={ref} {...rest}>
        {children}
      </MenuItem>
    );
  }
);

export default FeedActionButton;

const MenuItem = styled('button', {
  flexType: 'center',
  height: '42px',
  color: '$gray10',
  ...fontsObject.BODY_2_16_M,
  gap: '10px',
});
