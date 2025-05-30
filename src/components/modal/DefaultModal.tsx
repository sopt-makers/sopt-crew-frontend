import { Dialog } from '@headlessui/react';
import { PropsWithChildren, ReactNode } from 'react';
import { styled } from 'stitches.config';
import ModalContainer from './ModalContainer';

interface DefaultModalProps {
  isModalOpened: boolean;
  titleLeft?: ReactNode;
  title: string;
  handleModalClose: () => void;
  isSubmitting?: boolean;
}

const DefaultModal = ({
  isModalOpened,
  titleLeft,
  title,
  handleModalClose,
  children,
  isSubmitting,
}: PropsWithChildren<DefaultModalProps>) => {
  return (
    <ModalContainer isModalOpened={isModalOpened} handleModalClose={handleModalClose} isSubmitting={isSubmitting}>
      <SDialogWrapper>
        <SHeader>
          {titleLeft}
          <Dialog.Title className="title">{title}</Dialog.Title>
          <button className="close-button" onClick={isSubmitting ? () => null : handleModalClose} />
        </SHeader>
        <div>{children}</div>
      </SDialogWrapper>
    </ModalContainer>
  );
};

export default DefaultModal;

const SDialogWrapper = styled('div', {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '$2',
  borderRadius: '20px',
  backgroundColor: '$gray800',
  width: '$646',
  boxShadow: '4px 4px 40px #181818',

  '@tablet': {
    width: 'calc(100% - 40px)',
  },
});

const SHeader = styled('div', {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  height: '$100',
  padding: '$40 $40 $36 $40',
  borderBottom: `1px solid $gray600`,

  '.title': {
    width: '100%',
    fontAg: '24_bold_100',
    textAlign: 'center',
    color: '$gray10',
  },

  '.close-button': {
    width: '$24',
    height: '$24',
    background: `url('/group/assets/svg/x_big.svg')`,
    backgroundSize: 'cover',
  },

  '@tablet': {
    borderBottom: 'none',
    padding: '$24',

    '.title': {
      fontAg: '16_bold_100',
    },

    '.close-button': {
      width: '$16',
      height: '$16',
    },
  },
});
