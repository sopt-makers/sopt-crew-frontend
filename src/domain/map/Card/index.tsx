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

  const linkModalContent = () => {
    return (
      <div>
        <p>등록자가 입력한 외부 링크로 이동합니다.</p>
        <button>네이버 지도</button>
        <button>카카오 맵</button>
      </div>
    );
  };

  const handleLinkModalOpen = () => {
    const dialogOption: DialogOptionType = {
      title: '어떤 링크로 이동할까요?',
      description: linkModalContent(),
      type: 'default',
      typeOptions: {
        cancelButtonText: '취소',
        approveButtonText: '이동하기',
        onApprove: close,
      },
    };
    open(dialogOption);
  };

  return (
    <CardWrapper>
      {isDesktop ? (
        <DesktopMapCard onDelete={handleDeleteModalOpen} onLink={handleLinkModalOpen} />
      ) : (
        <MobileMapCard onDelete={handleDeleteModalOpen} onLink={handleLinkModalOpen} />
      )}
    </CardWrapper>
  );
};

export default MapCard;

const CardWrapper = styled('li', {
  width: '100%',
});
