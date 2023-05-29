import { styled } from 'stitches.config';

interface ChipItemProps {
  value: string;
  isSelected: boolean;
  addValue: (val: string) => void;
  deleteValue: (val: string) => void;
}

function ChipItem({ value, isSelected, addValue, deleteValue }: ChipItemProps) {
  const toggle = () => {
    if (isSelected) return deleteValue(value);
    return addValue(value);
  };
  return (
    <SOption isSelected={isSelected} onClick={toggle}>
      {value}
    </SOption>
  );
}

export default ChipItem;

const SOption = styled('button', {
  mt: '$10',
  fontAg: '16_medium_100',
  px: '$16',
  py: '$14',
  borderRadius: '10px',
  mr: '$8',
  variants: {
    isSelected: {
      true: {
        backgroundColor: '$purple200',
        color: '$white100',
      },
      false: {
        backgroundColor: '$black100',
        color: '$gray100',
      },
    },
  },
  '&:hover': {
    color: '$white100',
  },

  '@mobile': {
    fontAg: '12_semibold_100',
    borderRadius: '20px',
    px: '$12',
    py: '$8',
  },
});
