import { ReactNode, useState } from 'react';
import { TooltipContext } from './TooltipContext';
import { TooltipTrigger } from '@components/Tooltip/TooltipTrigger';
import { TooltipContent } from '@components/Tooltip/TooltipContent';
import { TooltipClose } from '@components/Tooltip/TooltipClose';
import { styled } from '@stitches/react';

interface TooltipProps {
  children: ReactNode;
  isTooltipOpen?: boolean;
  onTooltipToggle?: (open: boolean) => void;
}

export const TooltipRoot = ({ children, isTooltipOpen, onTooltipToggle }: TooltipProps) => {
  const [internalOpen, setInternalOpen] = useState(true);
  const isControlled = isTooltipOpen !== undefined;
  const isOpen = isControlled ? isTooltipOpen : internalOpen;

  const setIsOpen = (open: boolean) => {
    if (!isControlled) {
      setInternalOpen(open);
    }
    onTooltipToggle?.(open);
  };

  return (
    <TooltipContext.Provider value={{ isOpen, setIsOpen }}>
      <TooltipWrap role="tooltip">{children}</TooltipWrap>
    </TooltipContext.Provider>
  );
};

export const Tooltip = {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
  Close: TooltipClose,
};

const TooltipWrap = styled('div', {
  position: 'relative',
  zIndex: 1,
  '@media (max-width: 359px)': {
    display: 'none',
  },
});
