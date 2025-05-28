import { styled } from '../../../stitches.config';
import { useTooltipContext } from '@components/Tooltip/TooltipContext';
import { IconXClose } from '@sopt-makers/icons';
import React from 'react';

interface TooltipCloseProps {
  icon?: React.ReactNode;
}

export const TooltipClose = ({ icon }: TooltipCloseProps) => {
  const { setIsOpen } = useTooltipContext();

  return (
    <TooltipCloseStyle className="Tooltip-close" aria-label="Close Tooltip" onClick={() => setIsOpen(false)}>
      {icon ? icon : <IconXClose />}
    </TooltipCloseStyle>
  );
};

const TooltipCloseStyle = styled('button', {
  width: '$20',
  height: '$20',
  color: '$white',
});
