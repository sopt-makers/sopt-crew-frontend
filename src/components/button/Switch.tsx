import { Switch as HeadlessSwitch } from '@headlessui/react';
import { Fragment } from 'react';
import { CSSType, styled } from 'stitches.config';

export interface SwitchProps {
  css?: CSSType;
  checked: boolean;
  onChange: (value: boolean) => void;
}

function Switch({ css, checked, onChange }: SwitchProps) {
  return (
    <HeadlessSwitch as={Fragment} checked={checked} onChange={onChange}>
      {({ checked }) => (
        <SSwitch type="button" css={{ ...css }} checked={checked}>
          <SThumb />
        </SSwitch>
      )}
    </HeadlessSwitch>
  );
}

export default Switch;

const SSwitch = styled('button', {
  position: 'relative',
  width: '28px',
  height: '16px',
  border: 'none',
  backgroundColor: '$gray500',
  borderRadius: '20px',
  cursor: 'pointer',
  variants: {
    checked: {
      true: {
        backgroundColor: '$success',
        '& > div': {
          transform: 'translate3d(12px,0,0)',
        },
      },
    },
  },
});

const SThumb = styled('div', {
  position: 'absolute',
  top: '2px',
  left: '2px',
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: '$gray10',
  transition: 'transform 0.3s',
});
