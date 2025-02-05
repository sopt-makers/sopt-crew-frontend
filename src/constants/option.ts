export const PART_NAME: Record<string, string> = {
  PM: '기획',
  DESIGN: '디자인',
  IOS: 'iOS',
  ANDROID: 'Android',
  SERVER: '서버',
  WEB: '웹',
};

export const RECRUITMENT_STATUS = ['모집 전', '모집 중', '모집 마감'];
export const APPROVAL_STATUS = ['대기', '승인', '거절'];
export const APPROVAL_STATUS_ENGLISH = ['WAITING', 'APPROVE', 'REJECT'];
export const APPROVAL_STATUS_ENGLISH_TO_KOREAN = {
  WAITING: '대기',
  APPROVE: '승인',
  REJECT: '거절',
};
export const APPROVAL_STATUS_KOREAN_TO_ENGLISH: StringKeyObject = {
  대기: 'WAITING',
  승인: 'APPROVE',
  거절: 'REJECT',
};
export const APPLICATION_TYPE = ['신청', '초대'];
export const CATEGORY_OPTIONS = ['스터디', '세미나', '행사', '번쩍'];
export const CATEGORY_FILTER_OPTIONS = ['전체', ...CATEGORY_OPTIONS];
export const PART_OPTIONS = ['기획', '디자인', 'Android', 'iOS', '웹', '서버'];
export const PART_VALUES = ['PM', 'DESIGN', 'ANDROID', 'IOS', 'WEB', 'SERVER'];
export const ACTION_STATUS = ['모집 전', '모집 중', '모집 마감', '활동 중', '활동 종료'];

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

export const enum EActionStatus {
  BEFORE,
  RECRUITING,
  OVER,
  ACTING,
  AOVER,
}
export interface FilterType {
  label: string;
  subject: string;
  options: string[];
}

export const CATEGORY_FILTER = {
  label: '카테고리',
  subject: 'category',
  options: CATEGORY_FILTER_OPTIONS,
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

interface StringKeyObject {
  [key: string]: string;
}

export type CategoryType = 'STUDY' | 'EVENT' | 'SEMINAR' | '번쩍';
export type CategoryKoType = '스터디' | '행사' | '세미나' | '번쩍';
export const CATEGORY_NAME = (category: CategoryType) => {
  switch (category) {
    case '번쩍':
      return '번쩍';
    case 'STUDY':
      return '스터디';
    case 'EVENT':
      return '행사';
    case 'SEMINAR':
      return '세미나';
    default:
      return '';
  }
};
