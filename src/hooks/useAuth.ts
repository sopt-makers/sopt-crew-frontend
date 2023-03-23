import { useEffect, useState } from 'react';
import { getCrewToken } from 'src/api/auth';

export const ACCESS_TOKEN_KEY = 'serviceAccessToken';

interface Tokens {
  playgroundToken: string | null;
  crewToken: string | null;
}

export default function useAuth() {
  const [tokens, setTokens] = useState<Tokens>({
    playgroundToken: '',
    crewToken: '',
  });

  const setAccessTokens = (_tokens: Partial<Tokens>) => {
    setTokens(prevState => ({ ...prevState, ..._tokens }));
  };

  const requestCrewToken = async (playgroundToken: string) => {
    try {
      const { accessToken: crewToken } = await getCrewToken(playgroundToken);
      setAccessTokens({ crewToken: `Bearer ${crewToken}` });
    } catch {
      // TODO: 에러를 어떻게 핸들링하지?
      alert('계정 정보를 불러오지 못했습니다. 다시 로그인 해주세요.');
    }
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.location.pathname = '/auth/login';
  };

  useEffect(() => {
    // NOTE: development 환경에서는 테스트 토큰을 사용한다.
    if (process.env.NODE_ENV === 'development') {
      setTokens({
        // TODO: 테스트용 playground 토큰이 필요할 듯. 아니면 로컬에서 로그인 되도록 해야할 듯.
        playgroundToken: '',
        crewToken:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibGVlIiwidXNlcklkIjoxLCJpYXQiOjE2Njg0MzM0MTMsImV4cCI6MTcwNDQzMzQxM30.NGbf96zcykC0QQERvSe5F5S2uZO8Tuc13mkpb73y2Bo',
      });
    }
    // NOTE: production 에서는 로컬 스토리지에 저장된 토큰을 가져와 사용하고, 이를 바탕으로 모임 서비스 토큰도 발급한다.
    else {
      const playgroundToken = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (!playgroundToken) {
        setAccessTokens({ playgroundToken: null, crewToken: null });
        return;
      }
      setAccessTokens({ playgroundToken });
      requestCrewToken(playgroundToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    tokens,
    logout,
  };
}
