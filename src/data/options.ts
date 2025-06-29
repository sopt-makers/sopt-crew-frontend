import { KeywordSettingOptionType } from '@api/user';

export const numberOptionListDefault = { label: '10명씩 보기', value: '10' };

export const numberOptionList = [
  numberOptionListDefault,
  { label: '30명씩 보기', value: '30' },
  { label: '50명씩 보기', value: '50' },
];

export const sortOptionListDefault = { label: '최신순', value: 'desc' };

export const sortOptionList = [
  { label: '최신순', value: 'desc' },
  { label: '오래된 순', value: 'asc' },
];

export const generationOptions = [
  { label: '전체 기수', value: null },
  ...Array.from({ length: 31 }, (_, i) => i + 1).map(gen => ({
    label: `${gen}기`,
    value: gen.toString(),
  })),
];

export const defaultParts = { label: '전체', value: 'all', order: 1 };

export const parts = [
  { label: '전체', value: 'all', order: 1 },
  { label: '기획', value: 'PM', order: 2 },
  { label: '디자인', value: 'DESIGN', order: 3 },
  { label: 'Android', value: 'ANDROID', order: 5 },
  { label: 'iOS', value: 'IOS', order: 6 },
  { label: '웹', value: 'WEB', order: 4 },
  { label: '서버', value: 'SERVER', order: 7 },
];

export const flashTime = [
  { label: '당일', value: '당일' },
  { label: '예정 기간 (협의 후 결정)', value: '예정 기간 (협의 후 결정)' },
];

export const flashPlace = [
  { label: '오프라인', value: '오프라인' },
  { label: '온라인', value: '온라인' },
  { label: '협의 후 결정', value: '협의 후 결정' },
];

export const flashTags = [
  { label: 'YB 환영', value: 'YB 환영' },
  { label: 'OB 환영', value: 'OB 환영' },
  { label: '초면 환영', value: '초면 환영' },
  { label: '입문자 환영', value: '입문자 환영' },
  { label: '숙련자 환영', value: '숙련자 환영' },
];

export const keywordOptions = [
  { label: '운동', value: '운동' },
  { label: '먹방', value: '먹방' },
  { label: '취미', value: '취미' },
  { label: '학습', value: '학습' },
  { label: '자기계발', value: '자기계발' },
  { label: '네트워킹', value: '네트워킹' },
  { label: '기타', value: '기타' },
];

export const keywordSettiongOptions: KeywordSettingOptionType[] = [
  '학습',
  '취미',
  '먹방',
  '운동',
  '자기계발',
  '네트워킹',
];
