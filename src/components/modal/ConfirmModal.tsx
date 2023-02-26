import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';
import { Dialog } from '@headlessui/react';
import ModalBackground from '@components/modal/ModalBackground';

interface ConfirmModalProps {
  isModalOpened: boolean;
  message: string;
  cancelButton: string;
  confirmButton: string;
  handleModalClose: () => void;
  handleConfirm: () => void;
}

const ConfirmModal = ({
  isModalOpened,
  message,
  cancelButton,
  confirmButton,
  handleModalClose,
  handleConfirm,
}: ConfirmModalProps) => {
  return (
    <Dialog open={isModalOpened} onClose={handleModalClose}>
      <ModalBackground />
      <Dialog.Panel>
        <SDialogWrapper>
          <Dialog.Title className="title">{message}</Dialog.Title>
          <div>
            <button onClick={handleModalClose}>{cancelButton}</button>
            <button onClick={handleConfirm}>{confirmButton}</button>
          </div>
        </SDialogWrapper>
      </Dialog.Panel>
    </Dialog>
  );
};

export default ConfirmModal;

const SDialogWrapper = styled(Box, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '11',
  width: '$508',
  height: '$298',
  padding: '$48 $69',
  borderRadius: '20px',
  backgroundColor: '$black80',
  boxShadow: '4px 4px 40px #181818',

  '@mobile': {
    width: 'calc(100% - 40px)',
    height: 'fit-content',
    padding: '$32',
  },

  '.title': {
    mt: '$59',
    mb: '$63',
    fontAg: '24_bold_100',
    textAlign: 'center',
    color: '$white',

    '@mobile': {
      fontAg: '16_bold_100',
      mt: '$28',
      mb: '$40',
    },
  },

  button: {
    width: '$175',
    padding: '$19 0',
    borderRadius: '10px',
    fontAg: '20_bold_100',
    textAlign: 'center',
    color: '$white',

    '@mobile': {
      width: 'calc(50% - 10px)',
      padding: '$16 0',
      fontAg: '14_bold_100',
    },
  },

  'button:first-child': {
    backgroundColor: '$black20',
    mr: '$20',
  },

  'button:last-child': {
    backgroundColor: '$purple100',
  },
});
