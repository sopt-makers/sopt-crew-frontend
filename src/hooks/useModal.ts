import { useEffect, useState } from 'react';

const useModal = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpened(true);
  };

  const handleCloseModal = () => {
    setIsModalOpened(false);
  };

  useEffect(() => {
    if (isModalOpened) {
      document.body.style.overflowY = 'hidden';
      return;
    }

    document.body.style.overflowY = 'auto';

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [isModalOpened]);

  return {
    isModalOpened,
    handleOpenModal,
    handleCloseModal,
  };
};

export default useModal;
