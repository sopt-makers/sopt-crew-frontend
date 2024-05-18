import { PropsWithChildren } from 'react';
import ModalBackground from './ModalBackground';
import { Dialog } from '@headlessui/react';

export interface ModalContainerProps {
  isModalOpened: boolean;
  handleModalClose: () => void;
  isSubmitting?: boolean;
}

const ModalContainer = ({
  isModalOpened,
  handleModalClose,
  isSubmitting,
  children,
}: PropsWithChildren<ModalContainerProps>) => {
  return (
    <Dialog open={isModalOpened} onClose={isSubmitting ? () => {} : handleModalClose}>
      <ModalBackground />
      <Dialog.Panel>{children}</Dialog.Panel>
    </Dialog>
  );
};

export default ModalContainer;
