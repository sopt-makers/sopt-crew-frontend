import { useEffect, useState } from 'react';

const ACCESS_TOKEN_KEY = 'serviceAccessToken';

export default function useAuth() {
  const [accessToken, setAccessToken] = useState<string | null>('');

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.location.pathname = '/auth/login';
  };

  useEffect(() => {
    // TODO: remove after test
    if (process.env.NODE_ENV === 'development') {
      setAccessToken(
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibGVlIiwidXNlcklkIjoxLCJpYXQiOjE2Njg0MzM0MTMsImV4cCI6MTcwNDQzMzQxM30.NGbf96zcykC0QQERvSe5F5S2uZO8Tuc13mkpb73y2Bo'
      );
    } else {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      setAccessToken(token ? `Bearer ${token}` : null);
    }
  }, []);

  return {
    accessToken,
    logout,
  };
}
