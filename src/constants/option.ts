export const PART_NAME: Record<string, string> = {
  PM: '기획',
  DESIGN: '디자인',
  IOS: 'iOS',
  ANDROID: '안드로이드',
  SERVER: '서버',
  WEB: '웹',
};

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
