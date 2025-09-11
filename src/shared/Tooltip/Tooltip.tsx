import { TooltipClose } from '@shared/Tooltip/TooltipClose';
import { TooltipContent } from '@shared/Tooltip/TooltipContent';
import { TooltipContext } from '@shared/Tooltip/TooltipContext';
import { TooltipTrigger } from '@shared/Tooltip/TooltipTrigger';
import { styled } from '@stitches/react';
import { ReactNode, useState } from 'react';

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
  '@media (max-width: 320px)': {
    display: 'none',
  },
});
