import { useEffect } from 'react';
import * as amplitude from '@amplitude/analytics-browser';

export default function useAmplitudeInstance() {
  useEffect(() => {
    const API_KEY =
      process.env.NEXT_PUBLIC_APP_ENV === 'production'
        ? '765c1919975291c332c4fd993d9b9a9d'
        : '94650b2a33ffa5e8cc81b4ec3880730d';
    amplitude.init(API_KEY);
    const amplitudeObj = new amplitude.Identify();
    amplitude.identify(amplitudeObj);
  }, []);
}
