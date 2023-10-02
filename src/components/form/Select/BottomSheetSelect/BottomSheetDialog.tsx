import SelectBottomSheet from '@components/filter/MultiSelect/BottomSheet';
import { Dialog } from '@headlessui/react';
import { PropsWithChildren, ReactNode } from 'react';
import BottomSheetButton from './BottomSheetButton';
import { styled } from 'stitches.config';

interface BottomSheetDialogProps {
  isOpen: boolean;
  label: string;
  handleClose: () => void;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
}

function BottomSheetDialog({
  children,
  label,
  isOpen,
  handleClose,
  headerLeft,
  headerRight,
}: PropsWithChildren<BottomSheetDialogProps>) {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <SModalBackground onClick={handleClose} />
      <SelectBottomSheet
        label={label}
        isVisible={isOpen}
        handleClose={handleClose}
        headerLeft={headerLeft}
        headerRight={headerRight}
      >
        {children}
      </SelectBottomSheet>
    </Dialog>
  );
}

export default BottomSheetDialog;
BottomSheetDialog.Button = BottomSheetButton;

const SModalBackground = styled('div', {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '$2',
  width: '100%',
  height: '100%',
  backgroundColor: '$black80_trans',
});
