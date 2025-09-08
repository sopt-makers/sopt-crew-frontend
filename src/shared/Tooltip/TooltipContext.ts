import { createContext, useContext } from 'react';

interface TooltipContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

export const useTooltipContext = () => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error('Tooltip components must be used within a TooltipProvider');
  }
  return context;
};
