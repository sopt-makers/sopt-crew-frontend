import { PropsWithChildren } from 'react';
import ModalBackground from './ModalBackground';
import { Dialog } from '@headlessui/react';

export interface ModalContainerProps {
  isModalOpened: boolean;
  handleModalClose: () => void;
}

const ModalContainer = ({ isModalOpened, handleModalClose, children }: PropsWithChildren<ModalContainerProps>) => {
  return (
    <Dialog open={isModalOpened} onClose={handleModalClose}>
      <ModalBackground />
      <Dialog.Panel>{children}</Dialog.Panel>
    </Dialog>
  );
};

export default ModalContainer;
