import axios from 'axios';

export type PromiseResponse<T> = { data: T; statusCode: number };

// TODO: change after deploy server
const baseURL = 'https://makers-web.herokuapp.com';

export const api = axios.create({
  baseURL,
  // withCredentials: true,
});

// accessToken 키가 필요한 요청이 있어서 임시 제작
export const apiWithAuth = axios.create({
  baseURL,
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibGVlIiwiaWQiOjIsImlhdCI6MTY2Nzc0MTgxNywiZXhwIjoxNzAzNzQxODE3fQ.itd4icu8KBGjjkIL4RgcDZFFykUo66pxWjrKGUB3ZOE',
  },
});
