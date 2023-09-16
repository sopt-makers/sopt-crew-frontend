import { Box } from '@components/box/Box';
import { useEffect } from 'react';
import { styled } from 'stitches.config';
import CautionIcon from '@assets/svg/caution.svg';

type ToastType = 'error';

export interface ToastProps {
  isOpen: boolean;
  close(): void;
  type: ToastType;
  message: string;
}

function Toast({ isOpen, close, type, message }: ToastProps) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      close();
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <ToastContainer isOpen={isOpen}>
      {type === 'error' && <CautionIcon />}
      <ToastMessage>{message}</ToastMessage>
    </ToastContainer>
  );
}

export default Toast;

const ToastContainer = styled(Box, {
  flexType: 'verticalCenter',
  position: 'fixed',
  bottom: '-50px',
  left: '50%',
  backgroundColor: '$black60',
  padding: '12px 20px 12px 16px',
  borderRadius: '2000px',
  zIndex: 999,
  transform: 'translateX(-50%)',
  transition: 'bottom 0.3s ease-in-out',

  variants: {
    isOpen: {
      true: {
        bottom: '24px',
      },
    },
  },
});

const ToastMessage = styled('p', {
  fontStyle: 'T5',
  color: '$white100',
  ml: '$6',
  whiteSpace: 'nowrap',
});
