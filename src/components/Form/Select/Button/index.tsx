import { Fragment } from 'react';
import { Listbox } from '@headlessui/react';
import { styled } from 'stitches.config';
import ArrowSmallDownIcon from '@assets/svg/arrow_small_down.svg';
import { Option } from '@components/Form/Select/OptionItem';

interface ButtonProps {
  open?: boolean;
  value?: Option;
  type: 'invitation' | 'make';
}

function Button({ value, open, type }: ButtonProps) {
  const isNotSelected = value?.value === null;

  return (
    <Listbox.Button as={Fragment}>
      <SButton isNotSelected={isNotSelected} viewType={type}>
        {value?.label}
        <SArrowDownIcon open={open} isNotSelected={isNotSelected} />
      </SButton>
    </Listbox.Button>
  );
}

export default Button;

const SButton = styled('button', {
  minWidth: '147px',
  padding: '16px 20px 16px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  fontAg: '16_medium_100',
  color: '$white',
  borderRadius: 10,
  variants: {
    isNotSelected: {
      true: {
        color: '$gray100',
      },
    },
    viewType: {
      invitation: {
        border: '1px solid $black40',
        backgroundColor: '$black100',
      },
      make: { backgroundColor: '$black60' },
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
          stroke: '$gray100',
        },
      },
      false: {
        '& path': {
          stroke: '$white',
        },
      },
    },
  },
});
