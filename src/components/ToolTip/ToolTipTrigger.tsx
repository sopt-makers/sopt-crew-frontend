import { ReactNode } from 'react';
import { styled } from '../../../stitches.config';

interface ToolTipTriggerProps {
  children: ReactNode;
}

export const ToolTipTrigger = ({ children }: ToolTipTriggerProps) => {
  return <ToolTipTriggerStyle>{children}</ToolTipTriggerStyle>;
};

const ToolTipTriggerStyle = styled('div', {
  position: 'relative',
  zIndex: 1,
});
