import { useTooltipContext } from '@components/ToolTip/ToolTopContext';
import { ReactNode } from 'react';
import { styled } from '../../../stitches.config';
import BubblePointIcon from '@assets/svg/bubble_point.svg';
import { fontsObject } from '@sopt-makers/fonts';

interface ToolTipContentProps {
  children: ReactNode;
  title?: string;
  titleRightIcon?: ReactNode;
  ToolTipClose?: ReactNode;
}

export const ToolTipContent = ({ children, title, titleRightIcon, ToolTipClose }: ToolTipContentProps) => {
  const { isOpen } = useTooltipContext();

  if (!isOpen) return null;

  return (
    <ToolTipDiv>
      <PointDiv>
        <BubblePointIcon />
      </PointDiv>
      <TextDiv>
        <ToolTipHeader>
          <TitleDiv>
            {title}
            {titleRightIcon && titleRightIcon}
          </TitleDiv>
          {ToolTipClose && ToolTipClose}
        </ToolTipHeader>
        {children}
      </TextDiv>
    </ToolTipDiv>
  );
};

const ToolTipHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const TitleDiv = styled('div', {
  ...fontsObject.TITLE_7_14_SB,

  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '4px',
  color: '$gray30',
});

const ToolTipDiv = styled('div', {
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

const PointDiv = styled('div', {
  display: 'inline-flex',
  padding: '1px 16px 0 0',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

const TextDiv = styled('div', {
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
