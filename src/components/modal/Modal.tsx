import { Box } from '@components/box/Box';
import { styled } from '@stitches/react';
import { PropsWithChildren } from 'react';
import XBigIcon from '@assets/svg/x_big.svg';

interface ModalProps {
  title: string;
}

const Modal = ({ title, children }: PropsWithChildren<ModalProps>) => {
  return (
    <SModal>
      <p>{title}</p>
      <XBigIcon />
      <div>{children}</div>
    </SModal>
  );
};

export default Modal;

const SModal = styled(Box, {
  borderRadius: '20px',
});
