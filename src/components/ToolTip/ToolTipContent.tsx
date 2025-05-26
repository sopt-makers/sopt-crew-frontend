import { useTooltipContext } from '@components/ToolTip/ToolTopContext';
import { ReactNode } from 'react';
import { styled } from '../../../stitches.config';
import BubblePointIcon from '@assets/svg/bubble_point.svg';

interface ToolTipContentProps {
  children: ReactNode;
}

export const ToolTipContent = ({ children }: ToolTipContentProps) => {
  const { isOpen } = useTooltipContext();

  if (!isOpen) return null;

  return (
    <ToolTipDiv>
      <PointDiv>
        <BubblePointIcon />
      </PointDiv>
      <TextDiv>{children}</TextDiv>
    </ToolTipDiv>
  );
};

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
  paddingRight: '16px',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

const TextDiv = styled('div', {
  display: 'inline-flex',
  padding: '16px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '4px',

  width: '255px',

  borderRadius: '10px',
  backgroundColor: '$gray600',

  color: '$gray50',
});
