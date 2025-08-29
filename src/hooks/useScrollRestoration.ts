import { useRouter } from 'next/router';
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
      restoreScrollPosition();
    };

    router.events.on('routeChangeStart', onRouteChangeStart);
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart);
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [router]);
}

const restoreScrollPosition = () => {
  const scrollPos = JSON.parse('{"x": 0, "y": 0}'); // router.asPath 가 기록된 경우, 페이지 재진입 시 scroll 이 아래쪽으로 기억되어 있는 문제가 발생

  window.scroll(scrollPos.x, scrollPos.y);
};

export const useScrollRestorationAfterLoading = (isLoading: boolean) => {
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      restoreScrollPosition();
    }
  }, [router, isLoading]);
};
