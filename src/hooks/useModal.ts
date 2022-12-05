import { useState } from 'react';

export default function useModal() {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpened(true);
  };

  const handleModalClose = () => {
    setIsModalOpened(false);
  };

  return {
    isModalOpened,
    handleModalOpen,
    handleModalClose,
  };
}
