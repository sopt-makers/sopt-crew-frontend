import { useEffect } from 'react';
import { IntersectionObserverProps, useInView } from 'react-intersection-observer';

interface UseInfiniteScrollProps extends Omit<IntersectionObserverProps, 'children'> {
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
}

export const useInfiniteScroll = ({
  hasNextPage,
  fetchNextPage,
  threshold = 0,
  rootMargin = '0px',
  ...options
}: UseInfiniteScrollProps) => {
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    ...options,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return ref;
};
