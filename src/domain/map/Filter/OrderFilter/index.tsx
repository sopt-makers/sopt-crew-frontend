import { IconSwitchVertical } from '@sopt-makers/icons';
import { SelectV2 } from '@sopt-makers/ui';
import { styled } from 'stitches.config';
import { Option } from './constant';

interface OrderFilterProps {
  value?: Option;
  options: Option[];
  onChange: (value: string) => void;
}

const OrderFilter = ({ value, options, onChange }: OrderFilterProps) => {
  return (
    <SelectV2.Root type="text" onChange={val => onChange(val as string)} defaultValue={value}>
      <SelectV2.Trigger>
        <StyledTriggerContent icon={<StyledIconSwitchVertical />} />
      </SelectV2.Trigger>
      <SelectV2.Menu>
        {options.map(option => (
          <SelectV2.MenuItem key={option.value} option={option} />
        ))}
      </SelectV2.Menu>
    </SelectV2.Root>
  );
};

const StyledIconSwitchVertical = styled(IconSwitchVertical, {
  width: '20px',
  height: '20px',
  color: '$gray300',
});

const StyledTriggerContent = styled(SelectV2.TriggerContent, {
  // TODO: mds 수정 혹은 디자인 상의 필요..
  background: 'transparent !important',
  color: '$gray300 !important',
});

export default OrderFilter;
