import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from 'stitches.config';
import '../styles/globals.css';
import Header from '@components/header/Header';
import { Box } from '@components/box/Box';
import { GTM_ID, pageview } from '@utils/gtm';
import { setAccessTokens } from '@components/util/auth';
import Loader from '@components/loader/Loader';
import ChannelService from '@utils/ChannelService';
import { api, playgroundApi } from '@api/index';
import { fetchMyProfile } from '@api/user';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const router = useRouter();
  const [isServiceReady, setIsServiceReady] = useState(false);

  useEffect(() => {
    router.events.on('routeChangeComplete', pageview);
    return () => {
      router.events.off('routeChangeComplete', pageview);
    };
  }, [router.events]);

  useEffect(() => {
    // NOTE: development 환경에서는 테스트 토큰을 사용한다.
    if (process.env.NODE_ENV === 'development') {
      api.defaults.headers.common['Authorization'] =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi7J207J6s7ZuIIiwiaWQiOjI1NywiaWF0IjoxNjgxODE5NTcxLCJleHAiOjE3MTc4MTk1NzF9.JVG-xzOVikIbX7vj_cZig_TTHxM-EzMgjO-_VGRbLTs';
      playgroundApi.defaults.headers.common['Authorization'] =
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMyIsImV4cCI6MTY4MjI0NzIzNn0.jPK_OTNXVNvnVFkbdme6tfABsdryUFgXEYOYGCAxdPc';
      setIsServiceReady(true);
      return;
    }
    // NOTE: NODE_ENV가 production 환경에서는 로컬스토리지에 저장된 토큰을 가져와 사용
    setAccessTokens().then(() => setIsServiceReady(true));
  }, []);

  useEffect(() => {
    if (!isServiceReady) return;

    const channelTalk = new ChannelService();

    async function bootChannelTalk() {
      const pluginKey = process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY as string;
      try {
        const profileResponse = await fetchMyProfile();
        const user = profileResponse.data.data;
        channelTalk.boot({
          pluginKey,
          memberId: String(user.orgId),
          profile: {
            name: user.name,
            avatarUrl: user.profileImage ?? null,
          },
        });
      } catch (error) {
        channelTalk.boot({
          pluginKey,
        });
      }
    }
    bootChannelTalk();

    return () => {
      channelTalk.shutdown();
    };
  }, [isServiceReady]);

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
        {isServiceReady ? (
          <>
            <Header />
            <Component {...pageProps} />
          </>
        ) : (
          <Loader />
        )}
      </Box>
    </QueryClientProvider>
  );
}

export default MyApp;
