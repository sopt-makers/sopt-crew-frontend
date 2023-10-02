import { Ref, useImperativeHandle, forwardRef, useEffect, useState, useCallback } from 'react';

import { CreateOverlayElement } from './types';

interface Props {
  overlayElement: CreateOverlayElement;
  onExit: () => void;
}

export interface OverlayControlRef {
  close: () => void;
}

export const OverlayController = forwardRef(function OverlayController(
  { overlayElement: OverlayElement, onExit }: Props,
  ref: Ref<OverlayControlRef>
) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false), onExit();
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return { close: handleClose };
    },
    [handleClose]
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsOpen(true);
    });
  }, []);

  return <OverlayElement isOpen={isOpen} close={handleClose} exit={onExit} />;
});
