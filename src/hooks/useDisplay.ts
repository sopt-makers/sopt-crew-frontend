import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export function useDisplay() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const mobile = useMediaQuery({ query: '(max-width: 767px)' });
  const tablet = useMediaQuery({ query: '(max-width: 1023px)' });
  const laptop = useMediaQuery({ query: '(max-width: 1259px)' });
  const desktop = useMediaQuery({ query: '(min-width: 1024px)' }); // default is desktop

  useIsomorphicLayoutEffect(() => {
    setIsMobile(mobile);
  }, [mobile]);
  useIsomorphicLayoutEffect(() => {
    setIsTablet(tablet);
  }, [tablet]);
  useIsomorphicLayoutEffect(() => {
    setIsLaptop(laptop);
  }, [laptop]);
  useIsomorphicLayoutEffect(() => {
    setIsDesktop(desktop);
  }, [desktop]);

  return { isMobile, isTablet, isLaptop, isDesktop };
}
