import { api } from '@/api';
import axios from 'axios';
import { GetPresignedUrl } from './type';

export const getPresignedUrl = async (params: GetPresignedUrl['request']) => {
  const { data } = await api.get<GetPresignedUrl['response']>('/meeting/v2/presigned-url', {
    params,
  });
  return data;
};

export const uploadImage = async (file: File, url: string, fields: { [key: string]: string }) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    formData.append(key, value);
  }
  formData.append('file', file);
  return await axios.post<never>(url, formData);
};
