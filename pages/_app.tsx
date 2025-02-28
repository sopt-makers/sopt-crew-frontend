import { crewToken, playgroundToken } from '@/stores/tokenStore';
import { fetchMyProfile } from '@api/API_LEGACY/user';
import Header from '@components/header/Header';
import Loader from '@components/@common/loader/Loader';
import SEO from '@components/seo/SEO';
import { setAccessTokens } from '@components/util/auth';
import { OverlayProvider } from '@hooks/useOverlay/OverlayProvider';
import useScrollRestoration from '@hooks/useScrollRestoration';
import { useStore } from '@nanostores/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GTM_ID, pageview } from '@utils/gtm';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import { styled, theme } from 'stitches.config';
import { ampli } from '../src/ampli';
import '../styles/globals.css';
import '@sopt-makers/ui/dist/index.css';
import { DialogProvider, ToastProvider } from '@sopt-makers/ui';
import { MentionProvider } from '@components/feed/Mention/MentionContext';
import { globalStyles } from 'styles/globals';
import { SearchMentionProvider } from '@components/form/SearchMention/SearchMentionContext';

// 리액트 하이드레이션 에러를 피하기 위해 사용. 렌더링에 관여하지 않는 코드여서 if 문으로 분기처리
if (typeof window !== 'undefined') {
  setAccessTokens();
}

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  const router = useRouter();
  const _crewToken = useStore(crewToken);
  const _playgroundToken = useStore(playgroundToken);

  // 렌더링에 관여하는 IsServiceReady 인 경우, useEffect + setState 를 사용해 렌더링 시점을 뒤로 옮기기
  const [isServiceReady, setIsServiceReady] = useState(false);

  useEffect(() => {
    setIsServiceReady(Boolean(_crewToken && _playgroundToken));
  }, [_crewToken, _playgroundToken]);

  useScrollRestoration();

  useEffect(() => {
    router.events.on('routeChangeComplete', pageview);
    return () => {
      router.events.off('routeChangeComplete', pageview);
    };
  }, [router.events]);

  useEffect(() => {
    if (!isServiceReady) return;

    (async function initAmplitude() {
      if (process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY) {
        await ampli.load({
          client: {
            apiKey: process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY,
            configuration: {
              defaultTracking: true,
              minIdLength: 1,
            },
          },
        }).promise;
        const { data: user } = await fetchMyProfile();
        ampli.identify(user.orgId + '');
      }
    })();
  }, [isServiceReady]);

  useEffect(() => {
    return () => {
      ampli.flush();
    };
  }, []);

  useEffect(() => {
    try {
      if (window.Kakao) {
        window?.Kakao?.init(process.env.NEXT_PUBLIC_KAKAO_TALK_PLUGIN_KEY);
      }
      // eslint-disable-next-line no-empty
    } catch (e) {
      console.debug(e);
    }
  }, []);

  return (
    <SearchMentionProvider>
      <MentionProvider>
        <QueryClientProvider client={queryClient}>
          <SEO />
          <Script
            id="gtag-base"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `,
            }}
          />
          <Layout>
            <DialogProvider>
              <ToastProvider>
                <OverlayProvider>
                  {isServiceReady ? (
                    <>
                      <Header />
                      <Component {...pageProps} />
                    </>
                  ) : (
                    <Loader />
                  )}
                </OverlayProvider>
              </ToastProvider>
            </DialogProvider>
          </Layout>
        </QueryClientProvider>
      </MentionProvider>
    </SearchMentionProvider>
  );
}

export default MyApp;

const Layout = styled('div', {
  minHeight: '100vh',
  color: theme.colors.white,
  mx: '$auto',
  marginTop: '128px',
  width: '1200px',

  '@laptop': {
    width: '790px',
  },
  '@media (max-width: 849px)': {
    width: '780px',
  },
  '@tablet': {
    width: 'calc(100vw - 60px)',
  },
  '@mobile': {
    width: 'calc(100vw - 32px)',
    marginTop: '70px',
  },
});
