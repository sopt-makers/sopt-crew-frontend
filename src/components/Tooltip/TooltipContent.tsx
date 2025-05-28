import { useTooltipContext } from '@components/Tooltip/TooltipContext';
import { ReactNode } from 'react';
import { styled } from '../../../stitches.config';
import BubblePointIcon from '@assets/svg/bubble_point.svg';
import { fontsObject } from '@sopt-makers/fonts';

interface TooltipContentProps {
  children: ReactNode;
  title?: string;
  titleRightIcon?: ReactNode;
  TooltipClose?: ReactNode;
}

export const TooltipContent = ({ children, title, titleRightIcon, TooltipClose }: TooltipContentProps) => {
  const { isOpen } = useTooltipContext();

  if (!isOpen) return null;

  return (
    <STooltipDiv>
      <SPointDiv>
        <BubblePointIcon />
      </SPointDiv>
      <STextDiv>
        <STooltipHeader>
          <STitleDiv>
            {title}
            {titleRightIcon && titleRightIcon}
          </STitleDiv>
          {TooltipClose && TooltipClose}
        </STooltipHeader>
        {children}
      </STextDiv>
    </STooltipDiv>
  );
};

const STooltipHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const STitleDiv = styled('div', {
  ...fontsObject.TITLE_7_14_SB,

  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '4px',
  color: '$gray30',
});

const STooltipDiv = styled('div', {
  width: '252px',
  height: '162px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',

  position: 'absolute',
  top: '$42',
  right: '$0',
  isolate: 'isolation',
});

const SPointDiv = styled('div', {
  display: 'inline-flex',
  padding: '1px 16px 0 0',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

const STextDiv = styled('div', {
  ...fontsObject.BODY_4_13_M,

  padding: '16px',
  width: '255px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',

  borderRadius: '12px',
  backgroundColor: '$gray600',

  color: '$gray50',
});
