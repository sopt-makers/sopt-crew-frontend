import { GroupInfo } from '@components/feed/Modal/FeedFormPresentation';
import { api, PromiseResponse } from '../..';
import { MeetingResponse } from '../meeting';

/**
 * @deprecated
 */
interface ActivityResponse {
  part: string;
  generation: number;
}

/**
 * @deprecated
 */
export interface UserResponse {
  activities: ActivityResponse[];
  id: number;
  name: string;
  orgId: string;
  phone: string;
  profileImage: string;
}

export interface MyProfileResponse extends UserResponse {
  hasActivities: boolean;
}

/**
 * @deprecated
 * @example
 * 0 | 1 | 2 >> 'WAITING' | 'APPROVE' | 'REJECT' 로 변경되었습니다.
 */
export type ApplicationStatusType = 0 | 1 | 2;

export interface ApplyResponse {
  id: number;
  content: string;
  status: ApplicationStatusType;
  meeting: MeetingResponse;
  user: UserResponse;
}

interface MeetingListOfAppliedResponse {
  id: number;
  apply: ApplyResponse[];
  user: UserResponse;
}

interface MeetingListOfMineResponse {
  id: number;
  meetings: MeetingResponse[];
}

export const fetchMeetingListOfApplied = async () => {
  return api.get<PromiseResponse<MeetingListOfAppliedResponse>>('/users/apply');
};

export const fetchMeetingListOfMine = async () => {
  return api.get<PromiseResponse<MeetingListOfMineResponse>>('/users/meeting');
};

export const fetchMyProfile = async () => {
  return api.get<PromiseResponse<MyProfileResponse>>('/users/v1/profile/me');
};

export const fetchMeetingListOfUserAttend = async () => {
  return api.get<GroupInfo[]>('/user/v2/meeting/all');
};
