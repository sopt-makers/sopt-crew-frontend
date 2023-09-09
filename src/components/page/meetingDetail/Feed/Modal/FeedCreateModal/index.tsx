import ModalContainer, { ModalContainerProps } from '@components/modal/ModalContainer';
import FeedCreate from './FeedCreate';

function FeedCreateModal({ isModalOpened, handleModalClose }: ModalContainerProps) {
  return (
    <ModalContainer isModalOpened={isModalOpened} handleModalClose={handleModalClose}>
      <FeedCreate handleModalClose={handleModalClose} />
    </ModalContainer>
  );
}

export default FeedCreateModal;
