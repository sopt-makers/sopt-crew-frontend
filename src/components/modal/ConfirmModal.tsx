import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';
import ModalBackground from './ModalBackground';

interface ConfirmModalProps {
  message: string;
  cancelButton: string;
  confirmButton: string;
  handleModalClose: () => void;
}

const ConfirmModal = ({
  message,
  cancelButton,
  confirmButton,
  handleModalClose,
}: ConfirmModalProps) => {
  return (
    <>
      <ModalBackground />
      <SConfirmModal>
        <p>{message}</p>
        <div>
          <button onClick={handleModalClose}>{cancelButton}</button>
          <button onClick={handleModalClose}>{confirmButton}</button>
        </div>
      </SConfirmModal>
    </>
  );
};

export default ConfirmModal;

const SConfirmModal = styled(Box, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '2',
  width: '$508',
  height: '$298',
  padding: '$48 $69',
  borderRadius: '20px',
  backgroundColor: '$black80',
  boxShadow: '4px 4px 40px #181818',

  '& > p': {
    mt: '$59',
    mb: '$63',
    fontAg: '24_bold_100',
    textAlign: 'center',
  },

  button: {
    width: '$175',
    padding: '$19 0',
    borderRadius: '10px',
    fontAg: '18_semibold_100',
    textAlign: 'center',
    color: '$white',
  },

  'button:first-child': {
    backgroundColor: '$black20',
    mr: '$20',
  },

  'button:last-child': {
    backgroundColor: '$purple100',
  },
});
