import { Data, api, apiV2 } from '..';

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
  const { data } = await api.get('/user/v2/mention');
  return data;
};
