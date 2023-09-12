import { useOverlay } from '@hooks/useOverlay/Index';
import Toast from './Toast';

function useToast() {
  const overlay = useOverlay();

  const showToast = (message: string) => {
    overlay.open(({ isOpen, close }) => <Toast isOpen={isOpen} close={close} message={message} />);
  };

  return showToast;
}

export default useToast;
