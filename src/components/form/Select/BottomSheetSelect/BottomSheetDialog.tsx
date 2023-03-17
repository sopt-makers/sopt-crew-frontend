import SelectBottomSheet from '@components/filter/MultiSelect/BottomSheet';
import { Dialog } from '@headlessui/react';
import { PropsWithChildren } from 'react';
import BottomSheetButton from './BottomSheetButton';

interface BottomSheetDialogProps {
  isOpen: boolean;
  label: string;
  handleClose: () => void;
}

function BottomSheetDialog({ children, label, isOpen, handleClose }: PropsWithChildren<BottomSheetDialogProps>) {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <SelectBottomSheet label={label} isVisible={isOpen} handleClose={handleClose}>
        {children}
      </SelectBottomSheet>
    </Dialog>
  );
}

export default BottomSheetDialog;
BottomSheetDialog.Button = BottomSheetButton;
