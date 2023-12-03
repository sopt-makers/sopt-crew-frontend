import { PropsWithChildren, forwardRef } from 'react';
import { styled } from 'stitches.config';

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
  width: '147px',
  padding: '8px 16px',
  color: '$gray10',
  background: '$gray800',
  fontStyle: 'B3',
  border: '1px solid $gray600',
  '&:first-child': {
    borderRadius: '14px 14px 0 0',
    borderBottom: 'none',
  },
  '&:last-child': {
    borderRadius: '0 0 14px 14px ',
    borderTop: 'none',
  },
  '&:only-child': {
    borderRadius: '14px',
    border: '1px solid $gray600',
  },
});
