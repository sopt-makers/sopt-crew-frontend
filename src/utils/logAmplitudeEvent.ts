import { track } from '@amplitude/analytics-browser';
import { DependencyList } from 'react';

export interface AmplitudeCustomConfig {
  disable?: boolean;
  deps?: DependencyList;
}

export default async function logAmplitudeEvent(
  eventName: string,
  params?: Record<string, unknown>,
  config?: AmplitudeCustomConfig
) {
  if (typeof window !== 'undefined' && eventName && !config?.disable) {
    track(eventName, {
      url: window.location.href,
      ...params,
    });
  }
}
