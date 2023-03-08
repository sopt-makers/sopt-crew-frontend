import { CSSType } from 'stitches.config';
import ArrowBigRight from '@assets/svg/arrow_big_right.svg';
import ArrowSmallRight from '@assets/svg/arrow_small_right.svg';
import { MouseEventHandler } from 'react';
import { styled } from '@stitches/react';
import { Box } from '@components/box/Box';

interface ArrowButtonProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
  css?: CSSType;
  direction: 'right' | 'top' | 'left' | 'bottom';
  disabled?: boolean;
  size?: 'big' | 'small';
}

const ArrowButton = ({
  css,
  onClick,
  direction = 'left',
  disabled = false,
  size = 'big',
  ...props
}: ArrowButtonProps) => {
  return (
    <SWrapper css={{ ...css }} disabled={disabled} onClick={onClick} direction={direction} {...props}>
      {size === 'big' && <ArrowBigRight />}
      {size === 'small' && <ArrowSmallRight />}
    </SWrapper>
  );
};

const SWrapper = styled(Box, {
  p: '$8',
  '& svg': {
    display: 'block',
    margin: '0 auto',
  },

  variants: {
    direction: {
      right: {},
      top: {
        transform: 'rotate(270deg)',
      },
      left: { transform: 'rotate(180deg)' },
      bottom: {
        transform: 'rotate(90deg)',
      },
    },
    disabled: {
      true: {
        path: {
          stroke: '$black20',
        },
        cursor: 'not-allowed',
      },
      false: {
        path: {
          stroke: '$white',
        },
      },
    },
  },
});

export default ArrowButton;
