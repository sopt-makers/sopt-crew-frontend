import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export function useDisplay() {
  /* legacy */
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTable] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const mobile = useMediaQuery({ query: '(max-width: 430px)' });
  const tablet = useMediaQuery({ query: '(max-width: 840px)' });
  const laptop = useMediaQuery({ query: '(max-width: 1259px)' });
  const desktop = useMediaQuery({ query: '(min-width: 768px)' });

  const [isNewMobile, setIsNewMobile] = useState(false);
  const [isNewTablet, setIsNewTable] = useState(false);
  const [isNewLaptop, setIsNewLaptop] = useState(false);
  const [isNewDesktop, setIsNewDesktop] = useState(false);
  const newMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const newTablet = useMediaQuery({ query: '(max-width: 1023px)' });
  const newLaptop = useMediaQuery({ query: '(max-width: 1259px)' });
  const newDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

  useIsomorphicLayoutEffect(() => {
    setIsMobile(mobile);
  }, [mobile]);
  useIsomorphicLayoutEffect(() => {
    setIsTable(tablet);
  }, [tablet]);
  useIsomorphicLayoutEffect(() => {
    setIsLaptop(laptop);
  }, [laptop]);
  useIsomorphicLayoutEffect(() => {
    setIsDesktop(desktop);
  }, [desktop]);

  useIsomorphicLayoutEffect(() => {
    setIsNewMobile(newMobile);
  }, [newMobile]);
  useIsomorphicLayoutEffect(() => {
    setIsNewTable(newTablet);
  }, [newTablet]);
  useIsomorphicLayoutEffect(() => {
    setIsNewLaptop(newLaptop);
  }, [newLaptop]);
  useIsomorphicLayoutEffect(() => {
    setIsNewDesktop(newDesktop);
  }, [newDesktop]);

  return { isMobile, isTablet, isLaptop, isDesktop, isNewMobile, isNewTablet, isNewLaptop, isNewDesktop };
}
