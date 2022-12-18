import { useEffect, useState } from 'react';

const ACCESS_TOKEN_KEY = 'serviceAccessToken';

export default function useAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    setAccessToken(localStorage.getItem(ACCESS_TOKEN_KEY));
  }, []);

  return {
    accessToken,
  };
}
