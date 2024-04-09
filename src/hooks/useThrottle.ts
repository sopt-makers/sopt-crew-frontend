import { useRef } from 'react';

const THROTTLE_DEFAULT_TIME = 1 * 1000;

const useThrottle = <T extends () => void>(
  callback: T,
  throttleTime: number | undefined = THROTTLE_DEFAULT_TIME
): (() => void) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return () => {
    if (timer.current) return;

    callback();
    timer.current = setTimeout(() => {
      timer.current = null;
    }, throttleTime);
  };
};

export default useThrottle;
