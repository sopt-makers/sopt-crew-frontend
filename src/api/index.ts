import axios from 'axios';

// TODO: change after deploy server
const baseURL = 'https://makers-web.herokuapp.com';

export const api = axios.create({
  baseURL,
  // withCredentials: true,
});
