import { playgroundLink } from '@sopt-makers/playground-common';
import { getCrewToken } from '@api/auth';
import { crewToken, playgroundToken } from '@/stores/tokenStore';

// NOTE: playground token 다루는 로직은 추후 다 제거되어야 함
export const ACCESS_TOKEN_KEY = 'serviceAccessToken';
export const CREW_ACCESS_TOKEN_KEY = 'crewServiceAccessToken';

export const redirectToLoginPage = () => {
  sessionStorage.setItem('lastUnauthorizedPath', window.location.href);
  window.location.href = `${playgroundLink.login()}`;
};

export const getPlaygroundToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getCrewServiceToken = async (playgroundToken: string) => {
  // NOTE: crewToken이 없으면 playground Token으로 로그인 시도
  try {
    const { accessToken: crewToken } = await getCrewToken(playgroundToken);
    return crewToken;
  } catch {
    // TODO: 에러를 어떻게 핸들링하지?
    // TODO: 플레이 그라운드 토큰이 만료된 경우에는 어떡하지?
    alert('계정 정보를 불러오지 못했습니다. 다시 로그인 해주세요.');
    redirectToLoginPage();
  }
};

export const setAccessTokens = async () => {
  // NOTE: development 환경에서는 테스트 토큰을 사용한다.
  if (process.env.NODE_ENV === 'development') {
    crewToken.set(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi7J207J6s7ZuIIiwiaWQiOjI1NywiaWF0IjoxNjgxODE5NTcxLCJleHAiOjE3MTc4MTk1NzF9.JVG-xzOVikIbX7vj_cZig_TTHxM-EzMgjO-_VGRbLTs'
    );
    playgroundToken.set(
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMyIsImV4cCI6MTY4MjI0NzIzNn0.jPK_OTNXVNvnVFkbdme6tfABsdryUFgXEYOYGCAxdPc'
    );
    return;
  }

  const _playgroundToken = getPlaygroundToken();
  if (!_playgroundToken) {
    return redirectToLoginPage();
  }
  const _crewToken = await getCrewServiceToken(_playgroundToken);

  crewToken.set(_crewToken);
  playgroundToken.set(_playgroundToken);
};
