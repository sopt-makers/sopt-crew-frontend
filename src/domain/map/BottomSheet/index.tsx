import { fontsObject } from '@sopt-makers/fonts';
import { IconTrash, IconWrite } from '@sopt-makers/icons';
import { styled } from 'stitches.config';

interface MobileBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const MobileBottomSheet = ({ isOpen, onClose, onEdit, onDelete }: MobileBottomSheetProps) => {
  if (!isOpen) return null;

  return (
    <>
      <SOverlay onClick={onClose} />
      <SBottomSheet>
        <SMenuItem onClick={onEdit}>
          <SEditIcon />
          <SMenuText>수정</SMenuText>
        </SMenuItem>

        <SMenuItem onClick={onDelete}>
          <SDeleteIcon />
          <SMenuText>삭제</SMenuText>
        </SMenuItem>
      </SBottomSheet>
    </>
  );
};

const SOverlay = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 999,
});

const SBottomSheet = styled('div', {
  position: 'fixed',
  bottom: '$42',
  left: '$16',
  right: '$16',
  backgroundColor: '$gray800',
  borderRadius: '20px',
  padding: '$12 $8',
  zIndex: 1000,
  animation: 'slideUp 0.3s ease-out',

  '@keyframes slideUp': {
    from: {
      transform: 'translateY(100%)',
    },
    to: {
      transform: 'translateY(0)',
    },
  },
});

const SMenuItem = styled('button', {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '$10',
  border: 'none',
  cursor: 'pointer',
  color: '$gray10',
});

const SMenuText = styled('span', {
  ...fontsObject.BODY_3_14_M,
});

const SEditIcon = styled(IconWrite, {
  width: '$16',
  height: '$16',
  mr: '$8',
});

const SDeleteIcon = styled(IconTrash, {
  width: '$16',
  height: '$16',
  mr: '$8',
});

export default MobileBottomSheet;
