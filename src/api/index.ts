import { paths } from '@/__generated__/schema';
import { authToken } from '@/stores/tokenStore';
import { isProduction } from '@constant/environment';
import axios from 'axios';
import { computed } from 'nanostores';
import createClient from 'openapi-fetch';
import { checkToken, refreshToken } from './interceptor';

export type PromiseResponse<T> = { data: T; statusCode: number };
export type Data<T> = PromiseResponse<T>;

const baseURL = isProduction ? 'https://crew.api.prod.sopt.org' : 'https://crew.api.dev.sopt.org';

const authBaseURL = isProduction ? 'https://auth.api.sopt.org' : 'https://auth.api.dev.sopt.org';

const playgroundBaseURL = isProduction ? 'https://playground.api.sopt.org/' : 'https://playground.dev.sopt.org/';

export const baseApi = axios.create({ baseURL });

export const api = axios.create({
  baseURL,
});

export const authApi = axios.create({
  baseURL: authBaseURL,
  withCredentials: true,
});

authToken.subscribe(newToken => {
  api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
});

export const playgroundApi = axios.create({
  baseURL: playgroundBaseURL,
});

authToken.subscribe(newToken => {
  playgroundApi.defaults.headers.common['Authorization'] = newToken;
});

export const apiV2 = computed(authToken, currentToken =>
  createClient<paths>({
    baseUrl: baseURL,
    headers: currentToken ? { Authorization: `Bearer ${currentToken}` } : {},
  })
);

api.interceptors.request.use(checkToken, err => err);

api.interceptors.response.use(
  res => res,
  async err => refreshToken(err, api)
);

baseApi.interceptors.response.use(
  res => res,
  async err => refreshToken(err, baseApi)
);
