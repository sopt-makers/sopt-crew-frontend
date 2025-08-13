import { paths } from '@/__generated__/schema2';
import { PART_OPTIONS, PART_VALUES } from '@constants/option';
import axios from 'axios';
import dayjs from 'dayjs';
import { api } from '../..';
export interface ImageURLType {
  id: number;
  url: string;
}

function parseStatusToNumber(status: string, statusArray: string[]) {
  const statusIdx = statusArray.findIndex(item => item === status);
  if (statusIdx >= 0) return statusIdx;
  return null;
}
function parsePartLabelToValue(part: string) {
  const partIdx = PART_OPTIONS.findIndex(option => option === part);
  if (partIdx >= 0) return PART_VALUES[partIdx];
  return null;
}
export function parsePartValueToLabel(part: string) {
  const partIdx = PART_VALUES.findIndex(option => option === part);
  if (partIdx >= 0) return PART_OPTIONS[partIdx];
  return null;
}

type GetPresignedUrlResponse =
  paths['/meeting/v2/presigned-url']['get']['responses']['200']['content']['application/json;charset=UTF-8'];
export const getPresignedUrl = async (contentType: string) => {
  const { data } = await api.get<GetPresignedUrlResponse>('/meeting/v2/presigned-url', {
    params: { contentType },
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

export const returnNewStatus = (status: number, mstartDate: string, isGroupActive: boolean) => {
  if (status === 0 || status === 1) {
    return status;
  }
  if (new Date(mstartDate) > new Date()) {
    return 2;
  }
  if (isGroupActive) {
    return 3;
  }
  return 4;
};

export function returnIsGroupActive(mstartDate: string, mendDate: string) {
  return dayjs().isBetween(dayjs(mstartDate), dayjs(mendDate), 'day', '[]');
}
