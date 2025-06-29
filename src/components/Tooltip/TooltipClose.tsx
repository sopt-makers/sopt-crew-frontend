import { styled } from '../../../stitches.config';
import { IconXClose } from '@sopt-makers/icons';
import React from 'react';
import { useTooltipContext } from '@components/Tooltip/TooltipContext';

interface TooltipCloseProps {
  icon?: React.ReactNode;
}

export const TooltipClose = ({ icon }: TooltipCloseProps) => {
  const { setIsOpen } = useTooltipContext();

  return (
    <STooltipClose className="Tooltip-close" aria-label="Close Tooltip" onClick={() => setIsOpen(false)}>
      {icon ? icon : <IconXClose />}
    </STooltipClose>
  );
};

const STooltipClose = styled('button', {
  width: '$20',
  height: '$20',

  color: '$white',
});
