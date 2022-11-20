import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Box } from '@components/box/Box';
import { theme } from 'stitches.config';
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Box
        css={{
          maxWidth: '1260px',
          minHeight: '100vh',
          color: theme.colors.white,
          mx: '$auto',
          px: '$30',
        }}
      >
        <Component {...pageProps} />
      </Box>
    </QueryClientProvider>
  );
}

export default MyApp;
