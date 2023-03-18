import { Box } from '@components/box/Box';
import { Switch as HeadlessSwitch } from '@headlessui/react';
import { Fragment } from 'react';
import { CSSType, styled } from 'stitches.config';

interface SwitchProps {
  css?: CSSType;
  checked: boolean;
  onClick: () => void;
}

function Switch({ css, checked, onClick }: SwitchProps) {
  return (
    <HeadlessSwitch as={Fragment}>
      <SSwitch css={{ ...css }} checked={checked} onClick={onClick}>
        <SThumb className="toggle-button__thumb"></SThumb>
      </SSwitch>
    </HeadlessSwitch>
  );
}

export default Switch;

const SSwitch = styled('button', {
  position: 'relative',
  width: '28px',
  height: '16px',
  border: 'none',
  backgroundColor: '$gray100',
  borderRadius: '20px',
  cursor: 'pointer',
  variants: {
    checked: {
      true: {
        backgroundColor: '$purple100',
        '& > div': {
          transform: 'translate3d(12px,0,0)',
        },
      },
    },
  },
});

const SThumb = styled(Box, {
  position: 'absolute',
  top: '2px',
  left: '2px',
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: '$white',
  transition: 'transform 0.3s',
});
