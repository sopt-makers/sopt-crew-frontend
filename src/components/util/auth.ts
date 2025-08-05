import { playgroundToken } from '@/stores/tokenStore';
import { getCrewToken } from '@api/auth';
import { playgroundLink } from '@sopt-makers/playground-common';

export const ACCESS_TOKEN_KEY = 'serviceAccessToken';

export const redirectToLoginPage = () => {
  sessionStorage.setItem('lastUnauthorizedPath', window.location.href);
  window.location.href = `${playgroundLink.login()}`;
};

export const getPlaygroundToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const validatePlaygroundToken = async (playgroundToken: string) => {
  // NOTE: playground Token으로 초기 로그인 검증
  try {
    await getCrewToken(playgroundToken);
    return true;
  } catch {
    // TODO: 에러를 어떻게 핸들링하지?
    alert('계정 정보를 불러오지 못했습니다. 다시 로그인 해주세요.');
    redirectToLoginPage();
    return false;
  }
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
