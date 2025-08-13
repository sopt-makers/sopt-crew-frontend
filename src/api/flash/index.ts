import { GetFlash, PostFlash, PutFlash } from '@api/flash/type';
import { api } from '@api/index';
import { getMeetingList } from '@api/meeting';
import { GetMeetingList } from '@api/meeting/type';

export const postFlash = async (formData: PutFlash['request']) => {
  return (await api.post<PostFlash['response']>('/flash/v2', formData)).data;
};

export const getFlash = async (meetingId: number): Promise<GetFlash['response']> => {
  return (await api.get<GetFlash['response']>(`/flash/v2/${meetingId}`)).data;
};

export const getFlashList = async () => {
  const params: Omit<NonNullable<GetMeetingList['request']>, 'joinableParts'> & { joinableParts?: string } = {
    page: 1,
    take: 12,
    category: '번쩍',
    joinableParts: ['PM', 'DESIGN', 'IOS', 'ANDROID', 'SERVER', 'WEB'].join(','),
    isOnlyActiveGeneration: false,
    paginationType: 'DEFAULT',
  };

  return await getMeetingList(params as GetMeetingList['request']);
};

export const putFlash = async (meetingId: number, formData: PutFlash['request']) => {
  return (await api.put<PutFlash['response']>(`/flash/v2/${meetingId}`, formData)).data;
};
