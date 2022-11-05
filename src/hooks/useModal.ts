import { useEffect, useState } from 'react';

export default function useModal() {
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
}
