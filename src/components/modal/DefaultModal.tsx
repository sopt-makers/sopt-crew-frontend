import { Box } from '@components/box/Box';
import { PropsWithChildren } from 'react';
import { styled } from 'stitches.config';
import ModalBackground from './ModalBackground';
import { Dialog } from '@headlessui/react';

interface DefaultModalProps {
  isModalOpened: boolean;
  title: string;
  handleModalClose: () => void;
}

const DefaultModal = ({
  isModalOpened,
  title,
  handleModalClose,
  children,
}: PropsWithChildren<DefaultModalProps>) => {
  return (
    <Dialog open={isModalOpened} onClose={handleModalClose}>
      <ModalBackground />
      <Dialog.Panel>
        <SDialogWrapper>
          <SHeader>
            <Dialog.Title className="title">{title}</Dialog.Title>
            <button onClick={handleModalClose} />
          </SHeader>
          <div>{children}</div>
        </SDialogWrapper>
      </Dialog.Panel>
    </Dialog>
  );
};

export default DefaultModal;

const SDialogWrapper = styled(Box, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '20',
  borderRadius: '20px',
  backgroundColor: '$black80',
  width: '$646',
  boxShadow: '4px 4px 40px #181818',

  '@mobile': {
    width: 'calc(100% - 40px)',
  },
});

const SHeader = styled(Box, {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  height: '$100',
  padding: '$40 $40 $36 $40',
  borderBottom: `1px solid $black40`,

  '.title': {
    width: '100%',
    fontAg: '24_bold_100',
    textAlign: 'center',
    color: '$white',
  },

  button: {
    width: '$24',
    height: '$24',
    background: `url('/group/assets/svg/x_big.svg')`,
    backgroundSize: 'cover',
  },

  '@mobile': {
    borderBottom: 'none',
    padding: '$24',

    '.title': {
      fontAg: '16_bold_100',
    },

    button: {
      width: '$16',
      height: '$16',
    },
  },
});
