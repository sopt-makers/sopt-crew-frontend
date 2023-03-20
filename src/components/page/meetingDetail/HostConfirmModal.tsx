import ConfirmModal from '@components/modal/ConfirmModal';

interface HostConfirmModalProps {
  isModalOpened: boolean;
  handleModalClose: () => void;
  handleConfirm: () => void;
}

const HostConfirmModal = ({ isModalOpened, handleModalClose, handleConfirm }: HostConfirmModalProps) => {
  return (
    <ConfirmModal
      isModalOpened={isModalOpened}
      message="모임을 삭제하시겠습니까?"
      cancelButton="돌아가기"
      confirmButton="삭제하기"
      handleModalClose={handleModalClose}
      handleConfirm={handleConfirm}
    />
  );
};

export default HostConfirmModal;
