import { Flex } from '@shared/util/layout/Flex';
import { styled } from 'stitches.config';

interface SelectRadioItemProps {
  value: string;
  label: string;
  isChecked: boolean;
}

function SelectRadioItem({ value, label, isChecked }: SelectRadioItemProps) {
  return (
    <Flex as="div" align="center">
      <SCheckbox type="checkbox" checked={isChecked} id={value} name={value} />
      <label htmlFor={value}>{label}</label>
    </Flex>
  );
}
export default SelectRadioItem;

const SCheckbox = styled('input', {
  width: '16px',
  height: '16px',
  border: '1px solid $gray10',
  borderRadius: '50%',
  mr: '$8',
  '& + label': {
    cursor: 'pointer',
    fontAg: '16_medium_100',
  },
  variants: {
    checked: {
      true: {
        background: 'url(/group/assets/svg/radio/selected.svg) center center no-repeat',
        border: '0',
      },
    },
  },
});
