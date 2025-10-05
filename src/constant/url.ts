import { isProduction } from './environment';

export const playgroundURL = isProduction ? `https://playground.sopt.org` : 'https://sopt-internal-dev.pages.dev';

export const imageS3Bucket = 'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/';
