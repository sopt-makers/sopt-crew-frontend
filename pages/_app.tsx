import type { AppProps } from 'next/app';
import Script from 'next/script';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from 'stitches.config';
import '../styles/globals.css';
import Header from '@components/header/Header';
import { Box } from '@components/box/Box';
import { GTM_ID, pageview } from '@utils/gtm';
import { setAccessTokens } from '@components/util/auth';
import Loader from '@components/loader/Loader';
import ChannelService from '@utils/ChannelService';
import { fetchMyProfile } from '@api/user';
import { OverlayProvider } from '@hooks/useOverlay/OverlayProvider';
import SEO from '@components/seo/SEO';
import { crewToken, playgroundToken } from '@/stores/tokenStore';
import { useStore } from '@nanostores/react';
import { ampli } from '../src/ampli';

setAccessTokens();

function MyApp({ Component, pageProps }: AppProps) {
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
  const isServiceReady = _crewToken && _playgroundToken;

  useEffect(() => {
    router.events.on('routeChangeComplete', pageview);
    return () => {
      router.events.off('routeChangeComplete', pageview);
    };
  }, [router.events]);

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
        ampli.identify(user.data.orgId);
      }
    })();
  }, [isServiceReady]);

  useEffect(() => {
    return () => {
      ampli.flush();
    };
  }, []);

  return (
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
            px: '$16',
          },
        }}
      >
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
      </Box>
    </QueryClientProvider>
  );
}

export default MyApp;
