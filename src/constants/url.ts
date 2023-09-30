export const playgroundURL =
  process.env.NEXT_PUBLIC_APP_ENV === 'production'
    ? `https://playground.sopt.org`
    : 'https://sopt-internal-dev.pages.dev';

export const imageS3Bucket = 'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/';
