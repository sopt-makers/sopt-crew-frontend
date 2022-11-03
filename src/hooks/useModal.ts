import { useEffect, useState } from 'react';

const useModal = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpened(true);
  };

  const handleModalClose = () => {
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
    handleModalOpen,
    handleModalClose,
  };
};

export default useModal;
