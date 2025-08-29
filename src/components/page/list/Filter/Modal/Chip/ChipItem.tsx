import { ampli } from '@/ampli';
import { CATEGORY_FILTER, PART_FILTER, STATUS_FILTER } from '@constants/option';
import { useDisplay } from '@hooks/useDisplay';
import { Chip } from '@sopt-makers/ui';

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
