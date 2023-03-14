import { Flex } from '@components/util/layout/Flex';
import { styled } from 'stitches.config';

interface SelectRadioItemProps {
  value: string;
  isChecked: boolean;
}

function SelectRadioItem({ value, isChecked }: SelectRadioItemProps) {
  return (
    <Flex
      as="li"
      align="center"
      css={{
        width: '100%',
        height: '44px',
      }}
    >
      <SCheckbox type="checkbox" checked={isChecked} id={value} name={value} />
      <label htmlFor={value}>{value}</label>
    </Flex>
  );
}
export default SelectRadioItem;

const SCheckbox = styled('input', {
  width: '20px',
  height: '20px',
  border: '1px solid $white',
  borderRadius: '50%',
  mr: '$8',
  '& + label': {
    cursor: 'pointer',
    fontAg: '16_medium_100',
  },
  variants: {
    checked: {
      true: {
        background: 'url(/group/assets/img/radio/selected.png) center center no-repeat',
        border: '0',
      },
    },
  },
});
