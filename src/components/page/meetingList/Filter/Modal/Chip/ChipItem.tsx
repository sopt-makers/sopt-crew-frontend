import { ampli } from '@/ampli';
import { CATEGORY_FILTER, PART_FILTER, STATUS_FILTER } from '@constants/option';
import { styled } from 'stitches.config';

interface ChipItemProps {
  label: string;
  value: string;
  isSelected: boolean;
  addValue: (val: string) => void;
  deleteValue: (val: string) => void;
}

function ChipItem({ label, value, isSelected, addValue, deleteValue }: ChipItemProps) {
  const toggle = () => {
    switch (label) {
      case CATEGORY_FILTER.label:
        ampli.clickFilterCategory({ group_category: value });
        break;
      case STATUS_FILTER.label:
        ampli.clickFilterStatus({ group_status: value });
        break;
      case PART_FILTER.label:
        ampli.clickFilterPart({ group_part: value });
        break;
    }

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
        backgroundColor: '$white100',
        color: '$black100',
      },
      false: {
        backgroundColor: '$black100',
        color: '$gray100',
        '&:hover': {
          color: '$white100',
        },
        '@tablet': {
          backgroundColor: '$black40',
          color: '$gray60',
        },
      },
    },
  },

  '@tablet': {
    fontAg: '12_semibold_100',
    borderRadius: '20px',
    px: '$12',
    py: '$8',
  },
});
