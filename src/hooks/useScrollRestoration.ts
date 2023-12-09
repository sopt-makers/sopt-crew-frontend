import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';

const blacklist = ['/post', '/make'];

export default function useScrollRestoration() {
  const router = useRouter();

  useEffect(() => {
    if (!('scrollRestoration' in window.history)) return;

    if (blacklist.includes(router.pathname)) return;

    window.history.scrollRestoration = 'manual';

    const onRouteChangeStart = () => {
      const scrollPos = {
        x: window.scrollX,
        y: Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight),
      };
      sessionStorage.setItem(router.asPath, JSON.stringify(scrollPos));
    };

    const onRouteChangeComplete = () => {
      restoreScrollPosition(router);
    };

    router.events.on('routeChangeStart', onRouteChangeStart);
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart);
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [router]);
}

export const restoreScrollPosition = (router: NextRouter) => {
  const scrollPos = JSON.parse(sessionStorage.getItem(router.asPath) || '{"x": 0, "y": 0}');
  window.scroll(scrollPos.x, scrollPos.y);
};

export const useScrollRestorationAfterLoading = (isLoading: boolean) => {
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      restoreScrollPosition(router);
    }
  }, [router, isLoading]);
};
