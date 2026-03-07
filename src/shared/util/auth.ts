import { authToken } from '@/store/tokenStore';
import { validateAuthToken } from '@api/auth';
import { playgroundLink } from '@sopt-makers/playground-common';

export const ACCESS_TOKEN_KEY = 'serviceAccessToken';

export const redirectToLoginPage = () => {
  sessionStorage.setItem('lastUnauthorizedPath', window.location.href);
  window.location.href = `${playgroundLink.accounts()}`;
};

export const getAuthToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const setAccessTokens = async () => {
  // NOTE: development 환경에서는 테스트 토큰을 사용한다.
  if (process.env.NODE_ENV === 'development') {
    localStorage.setItem(ACCESS_TOKEN_KEY, process.env.NEXT_PUBLIC_AUTH_TOKEN ?? '');
    authToken.set(process.env.NEXT_PUBLIC_AUTH_TOKEN);
    return;
  }

  const _authToken = getAuthToken();
  if (!_authToken) {
    return redirectToLoginPage();
  }

  const isValid = await validateAuthToken(_authToken);
  if (isValid) {
    authToken.set(_authToken);
  }
};
