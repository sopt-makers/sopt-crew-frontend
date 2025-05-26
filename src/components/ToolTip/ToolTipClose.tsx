import { styled } from '../../../stitches.config';
import { useTooltipContext } from '@components/ToolTip/ToolTopContext';
import { IconXClose } from '@sopt-makers/icons';
import React from 'react';

interface ToolTipCloseProps {
  icon?: React.ReactNode;
}

export const ToolTipClose = ({ icon }: ToolTipCloseProps) => {
  const { setIsOpen } = useTooltipContext();

  return (
    <ToolTipCloseStyle className="tooltip-close" aria-label="Close tooltip" onClick={() => setIsOpen(false)}>
      {icon ? icon : <IconXClose />}
    </ToolTipCloseStyle>
  );
};

const ToolTipCloseStyle = styled('button', {
  width: '$20',
  height: '$20',
  color: '$white',
});
