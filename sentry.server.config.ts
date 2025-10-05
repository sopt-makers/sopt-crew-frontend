import { isProduction } from '@constant/environment';
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: isProduction ? 'production' : 'development',
  tracesSampleRate: 1.0,
});
