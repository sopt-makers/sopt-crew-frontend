import { useEffect, useState } from 'react';

const ACCESS_TOKEN_KEY = 'serviceAccessToken';

export default function useAuth() {
  const [accessToken, setAccessToken] = useState<string | null>('');

  useEffect(() => {
    // TODO: remove after test
    if (process.env.NODE_ENV === 'development') {
      setAccessToken(
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibGVlIiwidXNlcklkIjoxLCJpYXQiOjE2Njg0MzM0MTMsImV4cCI6MTcwNDQzMzQxM30.NGbf96zcykC0QQERvSe5F5S2uZO8Tuc13mkpb73y2Bo'
      );
    } else {
    setAccessToken(localStorage.getItem(ACCESS_TOKEN_KEY));
    }
  }, []);

  return {
    accessToken,
  };
}
