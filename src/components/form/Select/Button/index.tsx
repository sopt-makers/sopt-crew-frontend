import { Fragment } from 'react';
import { Listbox } from '@headlessui/react';
import { styled } from 'stitches.config';
import ArrowSmallDownIcon from '@assets/svg/arrow_small_down.svg';

interface ButtonProps {
  open?: boolean;
  label: {
    text?: string;
    /**
     * 텍스트 하이라이트 여부
     */
    active: boolean;
  };
}

function Button({ open, label }: ButtonProps) {
  const isNotSelected = !label.active;

  return (
    <Listbox.Button as={Fragment}>
      <SButton isNotSelected={isNotSelected}>
        {label.text}
        <SArrowDownIcon open={open} isNotSelected={isNotSelected} />
      </SButton>
    </Listbox.Button>
  );
}

export default Button;

const SButton = styled('button', {
  minWidth: '147px',
  padding: '$18 $20',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  fontAg: '16_medium_100',
  color: '$gray10',
  background: '$gray700',
  borderRadius: 10,
  variants: {
    isNotSelected: {
      true: {
        color: '$gray500',
      },
    },
  },
});
const SArrowDownIcon = styled(ArrowSmallDownIcon, {
  variants: {
    open: {
      true: {
        transform: 'rotate(180deg)',
      },
    },
    isNotSelected: {
      true: {
        '& path': {
          stroke: '$gray500',
        },
      },
      false: {
        '& path': {
          stroke: '$gray10',
        },
      },
    },
  },
});
