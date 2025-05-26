import { ReactNode, useEffect, useRef, useState } from 'react';
import { TooltipContext } from './ToolTopContext';
import { ToolTipTrigger } from '@components/ToolTip/ToolTipTrigger';
import { ToolTipContent } from '@components/ToolTip/ToolTipContent';
import { ToolTipClose } from '@components/ToolTip/ToolTipClose';

interface TooltipProps {
  children: ReactNode;
  isTooltipOpen?: boolean;
  onTooltipToggle?: (open: boolean) => void;
}

export const Tooltip = ({ children, isTooltipOpen, onTooltipToggle }: TooltipProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = isTooltipOpen !== undefined;
  const isOpen = isControlled ? isTooltipOpen : internalOpen;
  const tooltipRef = useRef<HTMLDivElement>(null);

  const setIsOpen = (open: boolean) => {
    if (!isControlled) {
      setInternalOpen(open);
    }
    onTooltipToggle?.(open);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setInternalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [tooltipRef]);

  return (
    <TooltipContext.Provider value={{ isOpen, setIsOpen }}>
      <div
        ref={tooltipRef}
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
  Close: ToolTipClose,
};
