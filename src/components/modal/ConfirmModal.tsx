import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';

interface ConfirmModalProps {
  message: string;
  cancelButton: string;
  confirmButton: string;
}

const ConfirmModal = ({
  message,
  cancelButton,
  confirmButton,
}: ConfirmModalProps) => {
  return (
    <SConfirmModal>
      <p>{message}</p>
      <div>
        <button>{cancelButton}</button>
        <button>{confirmButton}</button>
      </div>
    </SConfirmModal>
  );
};

export default ConfirmModal;

const SConfirmModal = styled(Box, {
  width: '$508',
  height: '$298',
  padding: '$48 $69',
  borderRadius: '20px',
  backgroundColor: '$black80_trans',

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
    backgroundColor: '$gray100',
    mr: '$20',
  },

  'button:last-child': {
    backgroundColor: '$purple100',
  },
});
