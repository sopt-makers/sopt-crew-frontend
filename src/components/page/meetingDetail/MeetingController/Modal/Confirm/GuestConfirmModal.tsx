import ConfirmModal from '@components/modal/ConfirmModal';

interface GuestConfirmModalProps {
  isModalOpened: boolean;
  message: string;
  handleModalClose: () => void;
  handleConfirm: () => void;
}

const GuestConfirmModal = ({ isModalOpened, message, handleModalClose, handleConfirm }: GuestConfirmModalProps) => {
  return (
    <ConfirmModal
      isModalOpened={isModalOpened}
      message={message}
      cancelButton="돌아가기"
      confirmButton="취소하기"
      handleModalClose={handleModalClose}
      handleConfirm={handleConfirm}
    />
  );
};

export default GuestConfirmModal;
