import { PropsWithChildren, useEffect } from 'react';
import ModalBackground from './ModalBackground';
import { Dialog } from '@headlessui/react';
import { styled } from 'stitches.config';
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
  return (
    <Show
      when={isHeadlessUi}
      fallback={
        <Show when={isModalOpened}>
          <div>
            <ModalBackground
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
