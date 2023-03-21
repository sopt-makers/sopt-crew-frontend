import axios from 'axios';

export type PromiseResponse<T> = { data: T; statusCode: number };
export type Data<T> = PromiseResponse<T>;

const baseURL = process.env.APP_ENV === 'production' ? 'https://crew.api.sopt.org' : 'https://crew.api.dev.sopt.org';

const playgroundBaseURL =
  process.env.APP_ENV === 'production' ? 'https://playground.api.sopt.org/' : 'https://playground.dev.sopt.org/';

export const api = axios.create({
  baseURL,
});

export const playgroundApi = axios.create({
  baseURL: playgroundBaseURL,
});
