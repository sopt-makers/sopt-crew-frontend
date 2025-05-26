import { ReactNode, useState } from 'react';
import { TooltipContext } from './ToolTopContext';
import { ToolTipTrigger } from '@components/ToolTip/ToolTipTrigger';
import { ToolTipContent } from '@components/ToolTip/ToolTipContent';

interface TooltipProps {
  children: ReactNode;
  isTooltipOpen?: boolean;
  onTooltipToggle?: (open: boolean) => void;
}

export const Tooltip = ({ children, isTooltipOpen, onTooltipToggle }: TooltipProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
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
      <div
        style={{ position: 'relative', zIndex: 1 }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {children}
      </div>
    </TooltipContext.Provider>
  );
};

export const ToolTip = {
  Root: Tooltip,
  Trigger: ToolTipTrigger,
  Content: ToolTipContent,
};
