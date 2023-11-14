import { Switch as HeadlessSwitch } from '@headlessui/react';
import Switch, { SwitchProps } from '@components/button/Switch';
import { styled } from 'stitches.config';

interface FormSwitchProps extends SwitchProps {
  label?: string;
}

export default function FormSwitch({ label, checked, onChange }: FormSwitchProps) {
  return (
    <HeadlessSwitch.Group>
      <SSwitchWrapper checked={checked}>
        {label && <SLabel>{label}</SLabel>}
        <Switch checked={checked} onChange={onChange} />
      </SSwitchWrapper>
    </HeadlessSwitch.Group>
  );
}

const SSwitchWrapper = styled('div', {
  padding: '18px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontAg: '16_medium_100',
  color: '$gray500',
  background: '$gray700',
  borderRadius: '10px',
  variants: {
    checked: {
      true: {
        color: '$gray10',
      },
    },
  },
});
const SLabel = styled(HeadlessSwitch.Label, {
  cursor: 'pointer',
  flexShrink: 0,
});
