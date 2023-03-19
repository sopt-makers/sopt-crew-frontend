import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
export function useDisplay() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTable] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const mobile = useMediaQuery({ query: '(max-width:768px)' });
  const tablet = useMediaQuery({ query: '(max-width: 1065px)' });
  const desktop = useMediaQuery({ query: '(min-width: 1065px)' });

  useIsomorphicLayoutEffect(() => {
    setIsMobile(mobile);
  }, [mobile]);
  useIsomorphicLayoutEffect(() => {
    setIsTable(tablet);
  }, [tablet]);
  useIsomorphicLayoutEffect(() => {
    setIsDesktop(desktop);
  }, [desktop]);

  return { isMobile, isTablet, isDesktop };
}
