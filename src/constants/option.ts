export const RECRUITMENT_STATUS = ['모집 전', '모집 중', '모집 마감'];
export const APPROVAL_STATUS = ['대기', '승인', '거절'];
export const APPLICATION_TYPE = ['신청', '초대'];
export const CATEGORY_OPTIONS = ['스터디'];
export const PART_OPTIONS = ['기획', '디자인', '안드로이드', 'IOS', '웹', '서버'];
export const PART_VALUES = ['PM', 'DESIGN', 'ANDROID', 'IOS', 'WEB', 'SERVER'];

export const enum ERecruitmentStatus {
  BEFORE,
  RECRUITING,
  OVER,
}
export const enum EApprovalStatus {
  WAITING,
  APPROVE,
  REJECT,
}
export const enum EApplicationType {
  APPLY,
  INVITE,
}
export interface FilterType {
  label: string;
  subject: string;
  options: string[];
}

export const CATEGORY_FILTER = {
  label: '카테고리',
  subject: 'category',
  options: CATEGORY_OPTIONS,
};
export const STATUS_FILTER = {
  label: '모집 상태',
  subject: 'status',
  options: RECRUITMENT_STATUS,
};
export const PART_FILTER = {
  label: '대상 파트',
  subject: 'part',
  options: PART_OPTIONS,
};
export enum EPartFilterValue {
  기획 = 'PM',
  디자인 = 'DESIGN',
  안드로이드 = 'ANDROID',
  IOS = 'IOS',
  서버 = 'SERVER',
  웹 = 'WEB',
}
