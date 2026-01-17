import { useEffect, useState } from 'react';

export const useDeviceType = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isDesktop: false,
  });

  useEffect(() => {
    const ua = navigator.userAgent;

    const mobileRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Kindle|Silk|Mobile/i;

    const isMobileUserAgent = mobileRegex.test(ua);

    const isIpadOS = ua.includes('Macintosh') && navigator.maxTouchPoints > 1;

    const isMobile = isMobileUserAgent || isIpadOS;

    setDeviceInfo({
      isMobile,
      isDesktop: !isMobile,
    });
  }, []);

  return deviceInfo;
};
