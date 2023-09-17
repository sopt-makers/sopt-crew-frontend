import logAmplitudeEvent, { AmplitudeCustomConfig } from '@utils/logAmplitudeEvent';
import { useEffect } from 'react';

interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

export default function useAmplitudeEvent(
  eventName: string,
  eventProperties?: EventProperties,
  config?: AmplitudeCustomConfig
) {
  useEffect(() => {
    logAmplitudeEvent(eventName, eventProperties, config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config?.deps]);
}
