import { paths } from '@/__generated__/schema';
import axios from 'axios';
import createClient from 'openapi-fetch';
import { computed } from 'nanostores';
import { crewToken, playgroundToken } from '@/stores/tokenStore';

export type PromiseResponse<T> = { data: T; statusCode: number };
export type Data<T> = PromiseResponse<T>;

const baseURL =
  process.env.NEXT_PUBLIC_APP_ENV === 'production' ? 'https://crew.api.prod.sopt.org' : 'https://crew.api.dev.sopt.org';

const playgroundBaseURL =
  process.env.NEXT_PUBLIC_APP_ENV === 'production'
    ? 'https://playground.api.sopt.org/'
    : 'https://playground.dev.sopt.org/';

export const baseApi = axios.create({ baseURL });

export const api = axios.create({
  baseURL,
});

crewToken.subscribe(newToken => {
  api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
});

export const playgroundApi = axios.create({
  baseURL: playgroundBaseURL,
});

playgroundToken.subscribe(newToken => {
  playgroundApi.defaults.headers.common['Authorization'] = newToken;
});

export const apiV2 = computed(crewToken, currentToken =>
  createClient<paths>({
    baseUrl: baseURL,
    headers: currentToken ? { Authorization: `Bearer ${currentToken}` } : {},
  })
);
