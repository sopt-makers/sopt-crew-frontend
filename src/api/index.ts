import axios from 'axios';

export type PromiseResponse<T> = { data: T; statusCode: number };
export type Data<T> = PromiseResponse<T>;

// TODO: change after deploy server
const baseURL = 'https://makers-web.herokuapp.com';

const playgroundBaseURL = 'https://playground.api.sopt.org/';

export const api = axios.create({
  baseURL,
});

export const playgroundApi = axios.create({
  baseURL: playgroundBaseURL,
});
