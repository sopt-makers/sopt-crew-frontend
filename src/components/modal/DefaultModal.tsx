import { Box } from '@components/box/Box';
import { PropsWithChildren } from 'react';
import XBigIcon from '@assets/svg/x_big.svg';
import { styled } from 'stitches.config';
import ModalBackground from './ModalBackground';

interface DefaultModalProps {
  title?: string;
}

const DefaultModal = ({
  title,
  children,
}: PropsWithChildren<DefaultModalProps>) => {
  return (
    <>
      <ModalBackground />
      <SDefaultModal>
        {title && (
          <SHeader>
            <STitle>{title}</STitle>
            <SXBigIcon as="button" />
          </SHeader>
        )}
        <div>{children}</div>
      </SDefaultModal>
    </>
  );
};

export default DefaultModal;

const SDefaultModal = styled(Box, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '20px',
  backgroundColor: '$black90',
});

const SHeader = styled(Box, {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  height: '$100',
  padding: '$40 $40 $36 $40',
  borderBottom: `1px solid $black40`,
});

const STitle = styled('p', {
  fontAg: '24_bold_100',
});

const SXBigIcon = styled(XBigIcon, {
  cursor: 'pointer',
});
