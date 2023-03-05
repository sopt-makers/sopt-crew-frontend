import { api, PromiseResponse } from '..';
import { MeetingResponse } from '../meeting';

export interface UserResponse {
  id: number;
  name: string;
  orgId: string;
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
