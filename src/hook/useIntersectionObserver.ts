import { useEffect, useState } from 'react';

interface IntersectionObserverProps {
  threshold?: number;
  root?: null;
  rootMargin?: string;
  onIntersect: IntersectionObserverCallback;
}

export const useIntersectionObserver = ({
  threshold = 0,
  root = null,
  rootMargin = '0px',
  onIntersect,
}: IntersectionObserverProps) => {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!target) return;
    const observer = new IntersectionObserver(onIntersect, { threshold, root, rootMargin });
    observer.observe(target);
    return () => observer.disconnect();
  }, [onIntersect, threshold, root, rootMargin, target]);

  return { setTarget };
};
