const dataLayer =
  typeof window === 'undefined'
    ? undefined
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as typeof window & { dataLayer?: { event: string; page: string }[] }).dataLayer;

export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;

export const pageview = (url: string) => {
  if (!dataLayer) return;
  dataLayer.push({
    event: 'pageview',
    page: url,
  });
};
