import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { OverlayContext } from './OverlayProvider';
import { OverlayController, OverlayControlRef } from './OverlayController';
import { CreateOverlayElement } from './types';

let elementId = 1;

export function useOverlay() {
  const context = useContext(OverlayContext);

  if (context == null) {
    throw new Error('useOverlay is only available within OverlayProvider.');
  }

  const { mount, unmount } = context;
  const [id] = useState(() => String(elementId++));

  const overlayRef = useRef<OverlayControlRef | null>(null);

  useEffect(() => {
    return () => {
      unmount(id);
    };
  }, [id, unmount]);

  return useMemo(
    () => ({
      open: (overlayElement: CreateOverlayElement) => {
        mount(
          id,
          <OverlayController
            key={Date.now()}
            ref={overlayRef}
            overlayElement={overlayElement}
            onExit={() => {
              unmount(id);
            }}
          />
        );
      },
      close: () => {
        overlayRef.current?.close();
      },
    }),
    [id, mount, unmount]
  );
}
