import { paths } from '@/__generated__/schema';
import { authToken } from '@/stores/tokenStore';
import axios from 'axios';
import { computed } from 'nanostores';
import createClient from 'openapi-fetch';
import { checkToken, refreshToken } from './interceptor';

export type PromiseResponse<T> = { data: T; statusCode: number };
export type Data<T> = PromiseResponse<T>;

const baseURL =
  process.env.NEXT_PUBLIC_APP_ENV === 'production' ? 'https://crew.api.prod.sopt.org' : 'https://crew.api.dev.sopt.org';

const authBaseURL = 'https://auth.api.dev.sopt.org';

const playgroundBaseURL =
  process.env.NEXT_PUBLIC_APP_ENV === 'production'
    ? 'https://playground.api.sopt.org/'
    : 'https://playground.dev.sopt.org/';

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

api.interceptors.response.use(res => res, refreshToken);
