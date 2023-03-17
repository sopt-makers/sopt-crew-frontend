import { Flex } from '@components/util/layout/Flex';
import { styled } from 'stitches.config';

interface SelectComboBoxItemProps {
  value: string;
  isChecked: boolean;
  onCheck: (value: string) => void;
  onRemove: (value: string) => void;
}

function SelectComboBoxItem({ value, isChecked, onCheck, onRemove }: SelectComboBoxItemProps) {
  const toggle = () => {
    if (!isChecked) onCheck(value);
    if (isChecked) onRemove(value);
  };

  return (
    <Flex as="li" onClick={toggle} align="center">
      <SCheckbox type="checkbox" checked={isChecked} id={value} name={value} />
      <label htmlFor={value}>{value}</label>
    </Flex>
  );
}
export default SelectComboBoxItem;

const SCheckbox = styled('input', {
  width: '16px',
  height: '16px',
  border: '1px solid $white',
  borderRadius: '4px',
  mr: '$8',
  '& + label': {
    cursor: 'pointer',
    fontAg: '16_medium_100',
  },
  variants: {
    checked: {
      true: {
        background: 'url(/group/assets/svg/checkBox/selected.svg) left top no-repeat',
        border: '0',
      },
    },
  },
});
