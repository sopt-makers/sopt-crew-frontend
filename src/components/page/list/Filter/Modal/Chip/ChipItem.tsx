import { ampli } from '@/ampli';
import { CATEGORY_FILTER, PART_FILTER, STATUS_FILTER } from '@constants/option';
import { useDisplay } from '@hooks/useDisplay';
import { Chip } from '@sopt-makers/ui';
import { styled } from 'stitches.config';

interface ChipItemProps {
  label: string;
  value: string;
  isSelected: boolean;
  addValue: (val: string) => void;
  deleteValue: (val: string) => void;
  resetQuery: () => void;
}

function ChipItem({ label, value, isSelected, addValue, deleteValue, resetQuery }: ChipItemProps) {
  const { isTablet } = useDisplay();
  const toggle = () => {
    if (value === '전체') {
      resetQuery();
      return;
    }

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
    <Chip size={isTablet ? 'sm' : 'md'} active={isSelected} onClick={toggle}>
      {value}
    </Chip>
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
        backgroundColor: '$gray10',
        color: '$gray950',
      },
      false: {
        backgroundColor: '$gray950',
        color: '$gray500',
        '&:hover': {
          color: '$gray10',
        },
        '@media (max-width: 768px)': {
          backgroundColor: '$gray600',
          color: '$gray300',
        },
      },
    },
  },

  '@media (max-width: 768px)': {
    fontAg: '12_semibold_100',
    borderRadius: '20px',
    px: '$12',
    py: '$8',
  },
});
