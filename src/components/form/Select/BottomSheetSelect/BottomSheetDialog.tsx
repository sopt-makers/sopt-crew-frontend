import SelectBottomSheet from '@components/filter/MultiSelect/BottomSheet';
import { Dialog } from '@headlessui/react';
import { PropsWithChildren, ReactNode } from 'react';
import BottomSheetButton from './BottomSheetButton';

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
