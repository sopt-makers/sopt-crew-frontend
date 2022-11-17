import { apiWithAuth, PromiseResponse } from '..';
import { GroupResponse, StatusType } from '../meeting';

export interface UserResponse {
  id: number;
  name: string;
  originId: string;
}
export interface ApplyResponse {
  id: number;
  content: string;
  status: StatusType;
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
