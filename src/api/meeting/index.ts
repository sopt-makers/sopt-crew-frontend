import {
  GetMeeting,
  GetMeetingList,
  GetMeetingMemberCSV,
  GetMeetingMemberList,
  GetRecommendMeetingList,
  PostMeeting,
  PostMeetingApplication,
  UpdateMeetingApplication,
} from '@api/meeting/type';
import { api } from '..';

export const getMeetingList = async (params: GetMeetingList['request']) => {
  return (await api.get<GetMeetingList['response']>('/meeting/v2', { params })).data;
};

export const postMeeting = async (body: PostMeeting['request']): Promise<PostMeeting['response']> => {
  return (await api.post<PostMeeting['response']>(`/meeting/v2`, body)).data;
};

export const getMeeting = async ({ meetingId }: GetMeeting['request']): Promise<GetMeeting['response']> => {
  return (await api.get<GetMeeting['response']>(`/meeting/v2/${meetingId}`)).data;
};

export const putMeeting = async (meetingId: number, body: PostMeeting['request']): Promise<PostMeeting['response']> => {
  return (await api.put<PostMeeting['response']>(`/meeting/v2/${meetingId}`, body)).data;
};

export const deleteMeeting = async (id: number) => {
  return (await api.delete(`/meeting/v2/${id}`)).data;
};

export const deleteMeetingApplication = async (meetingId: number) => {
  return (await api.delete(`/meeting/v2/${meetingId}/apply`)).data;
};

export const updateMeetingApplication = async ({
  meetingId,
  body,
}: {
  meetingId: number;
  body: UpdateMeetingApplication['request'];
}) => {
  return (await api.put(`/meeting/v2/${meetingId}/apply/status`, body)).data;
};

export const getMeetingMemberList = async ({
  params,
  meetingId,
}: {
  params: GetMeetingMemberList['request'];
  meetingId: string;
}): Promise<GetMeetingMemberList['response']> => {
  return (
    await api.get<GetMeetingMemberList['response']>(`/meeting/v2/${meetingId}/list`, {
      params,
    })
  ).data;
};

export const getMeetingMemberCSV = async (meetingId: string) => {
  // status를 1로 박아 놓은 이유 : 승인된 신청자만 보기 위해
  // type을 0,1로 둔 이유 : 지원, 초대 둘다 보기 위해 (지금은 초대가 없지만...)
  return await api.get<GetMeetingMemberCSV['response']>(
    `/meeting/v2/${meetingId}/list/csv?status=1&type=0,1&order=desc`
  );
};

export const postMeetingApplication = async (
  body: PostMeetingApplication['request']
): Promise<PostMeetingApplication['response']> => {
  return (await api.post<PostMeetingApplication['response']>(`/meeting/v2/apply`, body)).data;
};

export const postEventApplication = async (
  body: PostMeetingApplication['request']
): Promise<PostMeetingApplication['response']> => {
  return (await api.post<PostMeetingApplication['response']>(`/meeting/v2/apply/undefined`, body)).data;
};

export const getRecommendMeetingList = async ({ meetingIds = [] }: { meetingIds: number[] }) => {
  const meetingIdsParams = meetingIds.reduce((acc, id, idx) => {
    return acc + (idx === 0 ? '?' : '&') + `meetingIds=${id}`;
  }, '');

  return (await api.get<GetRecommendMeetingList['response']>(`/meeting/v2/recommend${meetingIdsParams}`, {})).data;
};
