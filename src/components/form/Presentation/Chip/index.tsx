import { fontsObject } from '@sopt-makers/fonts';
import { ButtonHTMLAttributes } from 'react';
import { styled } from 'stitches.config';

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement>;
export default function Chip({ children, ...props }: ChipProps) {
  return (
    <SChipContainer type="button" {...props}>
      {children}
    </SChipContainer>
  );
}

const SChipContainer = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  minWidth: '$80',
  height: '$36',
  padding: '$9 $14',

  borderRadius: '9999px',
  border: '1px solid $gray700',
  background: '$gray800',
  boxShadow: `0 0 0 1px $gray700`,

  ...fontsObject.LABEL_3_14_SB,
  color: '$gray300',

  whiteSpace: 'nowrap',

  ':hover': {
    color: '$white',
    backgroundColor: '$gray700',
  },

  ':active': {
    boxShadow: `0 0 0 1px $gray100`,
    color: '$white',
    backgroundColor: '$gray700',
  },
});
