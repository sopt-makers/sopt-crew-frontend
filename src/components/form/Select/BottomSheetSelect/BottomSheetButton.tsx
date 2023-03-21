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
  minWidth: '147px',
  padding: '16px 20px 16px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  fontAg: '16_medium_100',
  color: '$white',
  background: '$black60',
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
