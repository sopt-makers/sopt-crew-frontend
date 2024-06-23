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
