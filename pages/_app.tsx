import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from 'stitches.config';
import '../styles/globals.css';
import Header from '@components/header/Header';
import { Box } from '@components/box/Box';
import useAuth from '@hooks/useAuth';
import { api, playgroundApi } from 'src/api';
import { GTM_ID, pageview } from '@utils/gtm';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const router = useRouter();
  const {
    tokens: { playgroundToken, crewToken },
  } = useAuth();

  useEffect(() => {
    router.events.on('routeChangeComplete', pageview);
    return () => {
      router.events.off('routeChangeComplete', pageview);
    };
  }, [router.events]);

  useEffect(() => {
    // NOTE: playground token이 없다면 로그인 페이지로 redirect
    if (playgroundToken === null) {
      localStorage.setItem('lastUnauthorizedPath', window.location.pathname);
      window.location.pathname = '/auth/login';
      return;
    }
    // 토큰이 존재하면 이를 설정해준다.
    api.defaults.headers.common['Authorization'] = crewToken;
    playgroundApi.defaults.headers.common['Authorization'] = playgroundToken;
  }, [router, playgroundToken, crewToken]);

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>SOPT Playground</title>
      </Head>
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
      <Box
        css={{
          minHeight: '100vh',
          color: theme.colors.white,
          mx: '$auto',
          marginTop: '100px',
          '@desktop': {
            maxWidth: '1260px',
            px: '$30',
          },
          '@tablet': {
            px: '$20',
          },
          '@mobile': {
            marginTop: '70px',
          },
          '@small_mobile': {
            px: '$12',
          },
        }}
      >
        <Header />
        <Component {...pageProps} />
      </Box>
    </QueryClientProvider>
  );
}

export default MyApp;
