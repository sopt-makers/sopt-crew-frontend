import { ReactNode } from 'react';
import { styled } from '../../../stitches.config';

interface TooltipTriggerProps {
  children: ReactNode;
}

export const TooltipTrigger = ({ children }: TooltipTriggerProps) => {
  return <TooltipTriggerStyle>{children}</TooltipTriggerStyle>;
};

const TooltipTriggerStyle = styled('div', {
  position: 'relative',
  zIndex: 1,
});
