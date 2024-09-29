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
  handleOpen: () => void;
}

function BottomSheetButton({ open, label, handleOpen }: ButtonProps) {
  const isNotSelected = !label.active;

  return (
    <SButton type="button" isNotSelected={isNotSelected} onClick={handleOpen}>
      {label.text}
      <SArrowDownIcon open={open} isNotSelected={isNotSelected} />
    </SButton>
  );
}

export default BottomSheetButton;

const SButton = styled('button', {
  minWidth: '270px',
  padding: '16px 20px',
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
