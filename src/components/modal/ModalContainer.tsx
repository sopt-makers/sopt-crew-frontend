import { PropsWithChildren, useEffect } from 'react';
import ModalBackground from './ModalBackground';
import { Dialog } from '@headlessui/react';
import { styled } from 'stitches.config';
import { Box } from '@components/box/Box';
import Show from '@components/util/Show';

export interface ModalContainerProps {
  isModalOpened: boolean;
  handleModalClose: () => void;
  isHeadlessUi?: boolean;
}

const ModalContainer = ({
  isModalOpened,
  handleModalClose,
  isHeadlessUi = true,
  children,
}: PropsWithChildren<ModalContainerProps>) => {
  useEffect(() => {
    if (!isHeadlessUi && isModalOpened) {
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [isHeadlessUi, isModalOpened]);

  return (
    <Show
      when={isHeadlessUi}
      fallback={
        <Show when={isModalOpened}>
          <div>
            <SModalBackground
              onClick={e => {
                e.stopPropagation();
                handleModalClose();
              }}
            />
            <ModalContent>{children}</ModalContent>
          </div>
        </Show>
      }
    >
      <Dialog open={isModalOpened} onClose={handleModalClose}>
        <ModalBackground />
        <Dialog.Panel>{children}</Dialog.Panel>
      </Dialog>
    </Show>
  );
};

export default ModalContainer;

const ModalContent = styled('div', {
  zIndex: 100,
});

const SModalBackground = styled(Box, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '$2',
  width: '100%',
  height: '100%',
  backgroundColor: '$black80_trans',
});
