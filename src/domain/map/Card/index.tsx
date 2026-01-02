import { useDisplay } from '@hook/useDisplay';
import { DialogOptionType, useDialog } from '@sopt-makers/ui';
import { styled } from 'stitches.config';
import DesktopMapCard from './DesktopMapCard';
import MobileMapCard from './MobileMapCard';

const MapCard = () => {
  const { isDesktop } = useDisplay();
  const { open, close } = useDialog();

  const handleDeleteModalOpen = () => {
    const dialogOption: DialogOptionType = {
      title: '등록한 장소를 삭제할까요?',
      description: '삭제 시 복구할 수 없습니다.',
      type: 'danger',
      typeOptions: {
        cancelButtonText: '취소',
        approveButtonText: '삭제하기',
        onApprove: close,
      },
    };
    open(dialogOption);
  };

  return (
    <CardWrapper>
      {isDesktop ? (
        <DesktopMapCard onDelete={handleDeleteModalOpen} />
      ) : (
        <MobileMapCard onDelete={handleDeleteModalOpen} />
      )}
    </CardWrapper>
  );
};

export default MapCard;

const CardWrapper = styled('li', {
  width: '100%',
});
