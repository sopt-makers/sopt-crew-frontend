import { authToken } from '@/stores/tokenStore';
import { ACCESS_TOKEN_KEY, getAuthToken, redirectToLoginPage } from '@shared/util/auth';
import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { authApi } from './index';

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

let lock = false;

const checkLock = () => lock;

const setLock = (value: boolean) => {
  lock = value;
};

export const refreshToken = async (error: AxiosError<unknown>, instance: AxiosInstance) => {
  const originRequest = error.config;

  if (!error.response || !originRequest) throw new Error('에러가 발생했습니다.');

  const { status } = error.response;

  if (status === 401) {
    if (checkLock()) return instance(originRequest);
    setLock(true);

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
      instance.defaults.headers.common['Authorization'] = `Bearer ${data.data.accessToken}`;

      return instance(originRequest);
    } catch (error) {
      console.error(error);
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      redirectToLoginPage();

      throw new Error('토큰 갱신에 실패하였습니다.');
    } finally {
      setLock(false);
    }
  }

  return Promise.reject(error);
};
