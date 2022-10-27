import { Fragment } from 'react';
import { Listbox } from '@headlessui/react';
import { styled } from 'stitches.config';
import ArrowSmallDownIcon from '@assets/svg/arrow_small_down.svg';
import { Option } from '@components/Form/Select/OptionItem';

interface ButtonProps {
  open?: boolean;
  value: Option;
}

function Button({ value, open }: ButtonProps) {
  const isNotSelected = value.value === null;

  return (
    <Listbox.Button as={Fragment}>
      <SButton isNotSelected={isNotSelected}>
        {value.label}
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
  background: '$black40',
  borderRadius: 10,
  variants: {
    isNotSelected: {
      true: {
        color: '$gray100',
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
