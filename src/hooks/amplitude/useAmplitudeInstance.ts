import { useEffect } from 'react';
import * as amplitude from '@amplitude/analytics-browser';

export default function useAmplitudeInstance() {
  useEffect(() => {
    const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
    if (API_KEY) {
      amplitude.init(API_KEY);
      const amplitudeObj = new amplitude.Identify();
      amplitude.identify(amplitudeObj);
    }
  }, []);
}
