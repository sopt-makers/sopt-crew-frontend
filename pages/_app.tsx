import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Box } from '@components/box/Box';
import { theme } from 'stitches.config';
import Header from '@components/header/Header';
import { useRouter } from 'next/router';
import useAuth from '@hooks/useAuth';
import React, { useEffect } from 'react';
import { api, playgroundApi } from 'src/api';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const router = useRouter();
  const {
    tokens: { playgroundToken, crewToken },
  } = useAuth();

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
        }}
      >
        <Header />
        <Component {...pageProps} />
      </Box>
    </QueryClientProvider>
  );
}

export default MyApp;
