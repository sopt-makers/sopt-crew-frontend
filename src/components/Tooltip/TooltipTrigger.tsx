import { ReactNode } from 'react';
import { styled } from '../../../stitches.config';

interface TooltipTriggerProps {
  children: ReactNode;
}

export const TooltipTrigger = ({ children }: TooltipTriggerProps) => {
  return <SToolTipTrigger>{children}</SToolTipTrigger>;
};

const SToolTipTrigger = styled('div', {
  position: 'relative',
  zIndex: 1,
});
