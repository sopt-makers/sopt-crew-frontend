import type { Preview } from '@storybook/react';
import { OverlayProvider } from '../src/hooks/useOverlay/OverlayProvider';
import React from 'react';
import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#0f1012', // $gray950
        },
      ],
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    Story => {
      const queryClient = new QueryClient();

      return (
        <OverlayProvider>
          <QueryClientProvider client={queryClient}>
            <Story />
          </QueryClientProvider>
        </OverlayProvider>
      );
    },
  ],
};

export default preview;
