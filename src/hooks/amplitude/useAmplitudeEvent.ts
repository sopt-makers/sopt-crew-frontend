import logAmplitudeEvent, { AmplitudeCustomConfig } from '@utils/logAmplitudeEvent';
import { useEffect } from 'react';

type EventProperties = {
  [key: string]: string | number | boolean | undefined;
};

export default async function useAmplitudeEvent(
  eventName: string,
  eventProperties?: EventProperties,
  config?: AmplitudeCustomConfig
) {
  useEffect(() => {
    logAmplitudeEvent(eventName, eventProperties, config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config?.deps]);
}
