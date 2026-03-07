import { useEffect, useState } from 'react';

export const usePlatform = () => {
  const [platformInfo, setPlatformInfo] = useState({ isMobileOS: false, isDesktopOS: false });

  useEffect(() => {
    const ua = navigator.userAgent;

    const mobileRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Kindle|Silk|Mobile|SOPT/i;

    const isMobileUserAgent = mobileRegex.test(ua);

    const isIpadOS = ua.includes('Macintosh') && navigator.maxTouchPoints > 1;

    const isMobile = isMobileUserAgent || isIpadOS;

    setPlatformInfo({
      isMobileOS: isMobile,
      isDesktopOS: !isMobile,
    });
  }, []);

  return platformInfo;
};
