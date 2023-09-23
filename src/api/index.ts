import { paths } from '@/__generated__/schema';
import axios from 'axios';
import createClient from 'openapi-fetch';

export type PromiseResponse<T> = { data: T; statusCode: number };
export type Data<T> = PromiseResponse<T>;

const baseURL =
  process.env.NEXT_PUBLIC_APP_ENV === 'production' ? 'https://crew.api.prod.sopt.org' : 'https://crew.api.dev.sopt.org';

const playgroundBaseURL =
  process.env.NEXT_PUBLIC_APP_ENV === 'production'
    ? 'https://playground.api.sopt.org/'
    : 'https://playground.dev.sopt.org/';

export const api = axios.create({
  baseURL,
});

export const playgroundApi = axios.create({
  baseURL: playgroundBaseURL,
});

export const apiV2 = createClient<paths>({ baseUrl: baseURL });
