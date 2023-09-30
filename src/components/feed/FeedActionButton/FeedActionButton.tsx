import { PropsWithChildren } from 'react';
import { styled } from 'stitches.config';

type FeedActionButtonProps = React.HTMLAttributes<HTMLButtonElement>;

export default function FeedActionButton({ children, ...rest }: PropsWithChildren<FeedActionButtonProps>) {
  return <MenuItem {...rest}>{children}</MenuItem>;
}

const MenuItem = styled('button', {
  flexType: 'center',
  width: '147px',
  padding: '8px 16px',
  color: '$white100',
  background: '$black80',
  fontStyle: 'B3',
  border: '1px solid $black40',
  '&:first-child': {
    borderRadius: '14px 14px 0 0',
    borderBottom: 'none',
  },
  '&:last-child': {
    borderRadius: '0 0 14px 14px ',
    borderTop: 'none',
  },
});
