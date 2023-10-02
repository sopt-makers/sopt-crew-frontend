import ConfirmModal from '@components/modal/ConfirmModal';

interface ProfileConfirmModalProps {
  isModalOpened: boolean;
  handleModalClose: () => void;
  handleConfirm: () => void;
}

const ProfileConfirmModal = ({ isModalOpened, handleModalClose, handleConfirm }: ProfileConfirmModalProps) => {
  return (
    <ConfirmModal
      isModalOpened={isModalOpened}
      message={`모임을 신청하려면\n프로필 작성이 필요해요`}
      cancelButton="돌아가기"
      confirmButton="작성하기"
      handleModalClose={handleModalClose}
      handleConfirm={handleConfirm}
    />
  );
};

export default ProfileConfirmModal;
