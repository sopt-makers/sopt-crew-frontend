import Label from '@components/form/Label';
import { Listbox } from '@headlessui/react';
import useModal from '@hooks/useModal';
import MobileOptionItem from '../OptionItem/MobileOptionItem';
import BottomSheetDialog from './BottomSheetDialog';
import { Option } from '../OptionItem';
import { SelectProps } from '../types/props';

export default function BottomSheetSelect({ label, value, options, required, onChange, onBlur }: SelectProps) {
  const { isModalOpened, handleModalClose, handleToggle } = useModal();

  const handleChange = (newValue: Option) => {
    onChange(newValue);
  };
  const selectableOptions = options.filter(option => option.value);

  return (
    <div>
      {label && <Label required={required}>{label}</Label>}
      <BottomSheetDialog.Button value={value} open={isModalOpened} handleOpen={handleToggle} />
      <BottomSheetDialog label={label || ''} handleClose={handleModalClose} isOpen={isModalOpened}>
        <Listbox value={value} onChange={handleChange} onBlur={onBlur} as="div">
          <Listbox.Options static>
            {selectableOptions.map(option => (
              <MobileOptionItem key={option.value} option={option} selectedValue={value} />
            ))}
          </Listbox.Options>
        </Listbox>
      </BottomSheetDialog>
    </div>
  );
}
