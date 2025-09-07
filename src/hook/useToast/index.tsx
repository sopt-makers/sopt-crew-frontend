import { useOverlay } from '@hook/useOverlay/Index';
import Toast, { ToastProps } from './Toast';

function useToast() {
  const overlay = useOverlay();

  const showToast = ({ type, message }: Pick<ToastProps, 'message' | 'type'>) => {
    overlay.open(({ isOpen, close }) => <Toast isOpen={isOpen} close={close} type={type} message={message} />);
  };

  return showToast;
}

export default useToast;
