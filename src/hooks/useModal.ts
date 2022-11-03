import { useState } from 'react';

const useModal = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpened(true);
  };

  const handleCloseModal = () => {
    setIsModalOpened(false);
  };

  return {
    isModalOpened,
    handleOpenModal,
    handleCloseModal,
  };
};

export default useModal;
