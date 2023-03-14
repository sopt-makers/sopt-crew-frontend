import SelectBottomSheet from '@components/filter/MultiSelect/BottomSheet';
import { Dialog } from '@headlessui/react';
import { PropsWithChildren } from 'react';
import BottomSheetButton from './Button';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BottomSheetProps {
  isOpen: boolean;
  label: string;
  handleClose: () => void;
}

function BottomSheet({ children, label, isOpen, handleClose }: PropsWithChildren<BottomSheetProps>) {
  return (
    <Dialog open={true} onClose={handleClose}>
      <SelectBottomSheet label={label} isVisible={isOpen} handleClose={handleClose}>
        {children}
      </SelectBottomSheet>
    </Dialog>
  );
}

export default BottomSheet;
BottomSheet.Button = BottomSheetButton;
