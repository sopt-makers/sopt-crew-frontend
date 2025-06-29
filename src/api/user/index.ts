import { api } from '..';

interface ActivityResponse {
  part: string;
  generation: number;
}
export interface UserResponse {
  id: number;
  name: string;
  orgId: string;
  recentActivity: ActivityResponse;
  phone: string;
  profileImage: string;
}

export type ApplicationStatusType = 'WAITING' | 'APPROVE' | 'REJECT';

export const getMentionUsers = async () => {
  //타입 지정하지 않은 이유: Suggestion의 id, display 를 사용해야하기 때문
  const { data } = await api.get('/user/v2');
  return data;
};

export type KeywordSettingOptionType = '학습' | '취미' | '먹방' | '운동' | '자기계발' | '네트워킹';

export const postInterestedKeywards = async (keywords: KeywordSettingOptionType[]) => {
  const { data } = await api.post('/user/v2/interestedKeywords', { keywords });
  return data;
};

export const getInterestedKeywords = async () => {
  const { data } = await api.get('/user/v2/interestedKeywords');
  return data;
};
