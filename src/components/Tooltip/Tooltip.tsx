import { ReactNode, useState } from 'react';
import { TooltipContext } from './TooltipContext';
import { TooltipTrigger } from '@components/Tooltip/TooltipTrigger';
import { TooltipContent } from '@components/Tooltip/TooltipContent';
import { TooltipClose } from '@components/Tooltip/TooltipClose';

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
      <div style={{ position: 'relative', zIndex: 1 }} role="tooltip">
        {children}
      </div>
    </TooltipContext.Provider>
  );
};

export const Tooltip = {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
  Close: TooltipClose,
};
