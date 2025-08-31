import { api } from '@api/index';
import {
  GetUser,
  GetUserApplication,
  GetUserInterestedKeywords,
  GetUserMeetingAll,
  GetUserMeetingList,
  GetUserProfile,
  PostUserInterestedKeywords,
} from '@api/user/type';

export type ApplicationStatusType = 'WAITING' | 'APPROVE' | 'REJECT';

export const getUser = async () => {
  return (await api.get<GetUser>('/user/v2')).data;
};

export const getUserApplication = async () => {
  return (await api.get<GetUserApplication>('/user/v2/apply')).data;
};

export const getInterestedKeywords = async () => {
  return (await api.get<GetUserInterestedKeywords>('/user/v2/interestedKeywords')).data;
};

export const postInterestedKeywords = async (keywords: KeywordSettingOptionType[]) => {
  return (await api.post<PostUserInterestedKeywords>('/user/v2/interestedKeywords', { keywords })).data;
};

export const getUserMeetingList = async () => {
  return (await api.get<GetUserMeetingList>('/user/v2/meeting')).data;
};

export const getUserMeetingAll = async () => {
  return (await api.get<GetUserMeetingAll>('/user/v2/meeting/all')).data;
};

export const getUserProfile = async () => {
  return (await api.get<GetUserProfile>('/user/v2/profile/me')).data;
};

export type KeywordSettingOptionType = '학습' | '취미' | '먹방' | '운동' | '자기계발' | '네트워킹';
