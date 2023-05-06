import { api, PromiseResponse } from '..';
import { MeetingResponse } from '../meeting';

interface ActivityResponse {
  part: string;
  generation: number;
}

export interface UserResponse {
  activities: ActivityResponse[];
  id: number;
  name: string;
  orgId: string;
  phone: string;
  profileImage: string;
}

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
