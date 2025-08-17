import { authToken } from '@/stores/tokenStore';
import { ACCESS_TOKEN_KEY, getAuthToken, redirectToLoginPage } from '@components/util/auth';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { authApi, api as crewAxiosInstance } from './index';

export const checkToken = (config: AxiosRequestConfig) => {
  const token = getAuthToken();

  if (token && config.headers && !config.headers.Authorization) {
    if (authToken.get() !== token) {
      authToken.set(token);
    }
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

export const refreshToken = async (error: AxiosError<unknown>) => {
  const originRequest = error.config;

  if (!error.response || !originRequest) throw new Error('에러가 발생했습니다.');

  const { status } = error.response;

  if (status === 401) {
    const currentToken = getAuthToken();
    try {
      const { data } = await authApi.post<{ data: { accessToken: string } }>(`/api/v1/auth/refresh/web`, null, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      if (!originRequest.headers) {
        originRequest.headers = {};
      }
      originRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
      localStorage.setItem(ACCESS_TOKEN_KEY, data.data.accessToken);

      return crewAxiosInstance(originRequest);
    } catch (error) {
      console.error(error);
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      redirectToLoginPage();

      throw new Error('토큰 갱신에 실패하였습니다.');
    }
  }

  return Promise.reject(error);
};
