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
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibGVlIiwidXNlcklkIjoxLCJpYXQiOjE2Njg0MzM0MTMsImV4cCI6MTcwNDQzMzQxM30.NGbf96zcykC0QQERvSe5F5S2uZO8Tuc13mkpb73y2Bo',
  },
});
