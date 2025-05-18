export const PART_NAME: Record<string, string> = {
  PM: '기획',
  DESIGN: '디자인',
  ANDROID: 'Android',
  IOS: 'iOS',
  WEB: '웹',
  SERVER: '서버',
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
export const CATEGORY_OPTIONS = ['번쩍', '스터디', '세미나', '행사'];
export const KEYWORD_OPTIONS = ['학습', '취미', '먹방', '운동', '자기계발', '네트워킹', '기타'];
export const PART_OPTIONS = ['기획', '디자인', 'Android', 'iOS', '웹', '서버'];
export const PART_VALUES = ['PM', 'DESIGN', 'ANDROID', 'IOS', 'WEB', 'SERVER'];
export const ACTION_STATUS = ['모집 전', '모집 중', '모집 마감', '활동 중', '활동 종료'];

//todo: 서버 API 만들어지면 자동으로 기수가져와서 옵션에 넣기.
export const GENERATION_OPTION = ['36기만'];

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
  options: CATEGORY_OPTIONS,
};

export const KEYWORD_FILTER = {
  label: '키워드',
  subject: 'keyword',
  options: KEYWORD_OPTIONS,
};

export const STATUS_FILTER = {
  label: '모집 상태',
  subject: 'status',
  options: RECRUITMENT_STATUS,
};
export const PART_FILTER = {
  label: '파트',
  subject: 'part',
  options: PART_OPTIONS,
};

export const GENERATION_FILTER = {
  label: '기수',
  subject: 'isOnlyActiveGeneration',
  options: GENERATION_OPTION,
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
