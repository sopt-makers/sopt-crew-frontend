import { apiWithAuth, PromiseResponse } from '..';
import { GroupResponse } from '../meeting';

export interface UserResponse {
  id: number;
  name: string;
  originId: string;
}

export type ApplicationStatusType = 0 | 1 | 2;

export interface ApplyResponse {
  id: number;
  content: string;
  status: ApplicationStatusType;
  meeting: GroupResponse;
}

interface GroupListOfAppliedResponse {
  id: number;
  apply: ApplyResponse[];
  user: UserResponse;
}

interface GroupListOfMineResponse {
  id: number;
  meetings: GroupResponse[];
}

export const fetchGroupListOfApplied = async () => {
  return apiWithAuth.get<PromiseResponse<GroupListOfAppliedResponse>>(
    '/users/apply'
  );
};

export const fetchGroupListOfMine = async () => {
  return apiWithAuth.get<PromiseResponse<GroupListOfMineResponse>>(
    '/users/meeting'
  );
};
