import { ReactNode } from 'react';
import { styled } from '../../../stitches.config';
import BubblePointIcon from '@assets/svg/bubble_point.svg';
import { fontsObject } from '@sopt-makers/fonts';
import { useTooltipContext } from '@components/ToolTip/TooltipContext';

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
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '4px',

  color: '$gray30',
  ...fontsObject.TITLE_7_14_SB,
});

const STooltipDiv = styled('div', {
  position: 'absolute',
  top: '$38',
  right: '$0',
  zIndex: 1,
  isolate: 'isolation',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',

  width: '252px',
  height: '162px',
});

const SPointDiv = styled('div', {
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'flex-start',

  padding: '1px 16px 0 0',
});

const STextDiv = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',

  width: '255px',
  padding: '16px',

  borderRadius: '12px',
  backgroundColor: '$gray600',
  color: '$gray50',

  ...fontsObject.BODY_4_13_M,
});
