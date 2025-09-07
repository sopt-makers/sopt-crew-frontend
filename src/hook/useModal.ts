import { useState } from 'react';

export default function useModal() {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpened(true);
  };

  const handleModalClose = () => {
    setIsModalOpened(false);
  };
  const handleToggle = () => setIsModalOpened(prev => !prev);
  return {
    isModalOpened,
    handleModalOpen,
    handleModalClose,
    handleToggle,
  };
}
