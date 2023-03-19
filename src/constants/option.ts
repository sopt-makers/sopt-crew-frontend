export const RECRUITMENT_STATUS = ['모집 전', '모집 중', '모집 마감'];
export const APPROVAL_STATUS = ['대기', '승인', '거절'];
export const APPLICATION_TYPE = ['신청', '초대'];

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
  options: ['스터디'],
};
export const STATUS_FILTER = {
  label: '모집 상태',
  subject: 'status',
  options: ['모집 전', '모집 중', '모집 마감'],
};
export const PART_FILTER = {
  label: '대상 파트',
  subject: 'part',
  options: ['기획', '디자인', '안드로이드', 'IOS', '웹', '서버'],
};
