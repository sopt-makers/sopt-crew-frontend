import { CSSType } from 'stitches.config';
import ArrowBigRight from '@assets/svg/arrow_big_right.svg?rect';
import { MouseEventHandler } from 'react';
import { styled } from '@stitches/react';
import { mergeCss } from '@utils/styles';

interface ArrowProps {
  size?: number;
  color?: string;
  disabledColor?: string;
  strokeWidth?: number;
  css?: CSSType;
  direction: 'right' | 'top' | 'left' | 'bottom';
}
interface ArrowButtonProps extends ArrowProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const ArrowButton = ({
  css,
  onClick,
  direction = 'left',
  disabled = false,
  size = 16,
  color = '#fff',
  disabledColor = '$black40',
  strokeWidth = 2,
  ...props
}: ArrowButtonProps) => {
  return (
    <SButton css={{ ...css }} disabled={disabled} onClick={onClick} {...props}>
      <Arrow color={disabled ? disabledColor : color} direction={direction} strokeWidth={strokeWidth} size={size} />
    </SButton>
  );
};

const SButton = styled('button', {
  p: '$8',
  variants: {
    disabled: {
      true: {
        cursor: 'not-allowed',
      },
    },
  },
});

export const Arrow = ({
  css,
  direction = 'left',
  size = 16,
  color = '#fff',
  strokeWidth = 2,
  ...props
}: ArrowProps) => {
  return (
    <SArrow
      css={mergeCss(
        { svg: { width: `${size}px`, height: `${size}px` }, path: { strokeWidth: strokeWidth, stroke: color } },
        { ...css }
      )}
      direction={direction}
      {...props}
    />
  );
};

const SArrow = styled(ArrowBigRight, {
  display: 'block',
  margin: '0 auto',
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
  },
});
