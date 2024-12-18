import ConfirmModal from '@components/modal/ConfirmModal';

interface GuestConfirmModalProps {
  isModalOpened: boolean;
  message: string;
  handleModalClose: () => void;
  handleConfirm: () => void;
  cancelButtonDisabled?: boolean;
  confirmButtonDisabled?: boolean;
  isSubmitting?: boolean;
}

const GuestConfirmModal = ({
  isModalOpened,
  message,
  handleModalClose,
  handleConfirm,
  cancelButtonDisabled,
  confirmButtonDisabled,
  isSubmitting,
}: GuestConfirmModalProps) => {
  return (
    <ConfirmModal
      isModalOpened={isModalOpened}
      message={message}
      cancelButton="돌아가기"
      confirmButton="취소하기"
      handleModalClose={handleModalClose}
      handleConfirm={handleConfirm}
      cancelButtonDisabled={cancelButtonDisabled}
      confirmButtonDisabled={confirmButtonDisabled}
      isSubmitting={isSubmitting}
    />
  );
};

export default GuestConfirmModal;
