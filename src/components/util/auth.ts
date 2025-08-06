import { playgroundToken } from '@/stores/tokenStore';
import { validatePlaygroundToken } from '@api/auth';
import { playgroundLink } from '@sopt-makers/playground-common';

export const ACCESS_TOKEN_KEY = 'serviceAccessToken';

export const redirectToLoginPage = () => {
  sessionStorage.setItem('lastUnauthorizedPath', window.location.href);
  window.location.href = `${playgroundLink.login()}`;
};

export const getPlaygroundToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const setAccessTokens = async () => {
  // NOTE: development 환경에서는 테스트 토큰을 사용한다.
  if (process.env.NODE_ENV === 'development') {
    playgroundToken.set(process.env.NEXT_PUBLIC_PLAYGROUND_TOKEN);
    return;
  }

  const _playgroundToken = getPlaygroundToken();
  if (!_playgroundToken) {
    return redirectToLoginPage();
  }

  const isValid = await validatePlaygroundToken(_playgroundToken);
  if (isValid) {
    playgroundToken.set(_playgroundToken);
  }
};
