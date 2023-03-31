import { api, playgroundApi } from 'src/api';
import { getCrewToken } from 'src/api/auth';

// NOTE: playground token 다루는 로직은 추후 다 제거되어야 함
export const ACCESS_TOKEN_KEY = 'serviceAccessToken';
export const CREW_ACCESS_TOKEN_KEY = 'crewServiceAccessToken';

export const getPlaygroundToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getCrewServiceToken = async (playgroundToken: string) => {
  const crewToken = localStorage.getItem(CREW_ACCESS_TOKEN_KEY);
  if (crewToken) {
    return crewToken;
  }
  // NOTE: crewToken이 없으면 playground Token으로 로그인 시도
  try {
    const { accessToken: crewToken } = await getCrewToken(playgroundToken);
    localStorage.setItem(CREW_ACCESS_TOKEN_KEY, crewToken);
    return crewToken;
  } catch {
    // TODO: 에러를 어떻게 핸들링하지?
    // TODO: 플레이 그라운드 토큰이 만료된 경우에는 어떡하지?
    alert('계정 정보를 불러오지 못했습니다. 다시 로그인 해주세요.');
  }
};

export const redirectToLoginPage = () => {
  localStorage.setItem('lastUnauthorizedPath', window.location.pathname);
  window.location.pathname = '/auth/login';
};

export const setAccessTokens = async () => {
  const playgroundToken = getPlaygroundToken();
  if (!playgroundToken) {
    return redirectToLoginPage();
  }
  const crewToken = await getCrewServiceToken(playgroundToken);

  api.defaults.headers.common['Authorization'] = `Bearer ${crewToken}`;
  playgroundApi.defaults.headers.common['Authorization'] = playgroundToken;
};
