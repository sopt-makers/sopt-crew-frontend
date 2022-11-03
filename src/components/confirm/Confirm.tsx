import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';

interface ConfirmProps {
  message: string;
  cancelButton: string;
  confirmButton: string;
}

const Confirm = ({ message, cancelButton, confirmButton }: ConfirmProps) => {
  return (
    <SConfirm>
      <p>{message}</p>
      <div>
        <button>{cancelButton}</button>
        <button>{confirmButton}</button>
      </div>
    </SConfirm>
  );
};

export default Confirm;

const SConfirm = styled(Box, {
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
