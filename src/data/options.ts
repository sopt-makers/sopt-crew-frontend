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
  { label: '웹', value: 'WEB', order: 4 },
  { label: 'Android', value: 'ANDROID', order: 5 },
  { label: 'iOS', value: 'IOS', order: 6 },
  { label: '서버', value: 'SERVER', order: 7 },
];

export const lighteningTime = [
  { label: '당일', value: '당일' },
  { label: '예정 기간 (협의 후 결정)', value: '예정 기간 (협의 후 결정)' },
];

export const lighteningPlace = [
  { label: '오프라인', value: '오프라인' },
  { label: '온라인', value: '온라인' },
  { label: '협의 후 결정', value: '협의 후 결정' },
];

export const lighteningTags = [
  { label: 'YB 환영', value: 'YB 환영' },
  { label: 'OB 환영', value: 'OB 환영' },
  { label: '초면 환영', value: '초면 환영' },
  { label: '입문자 환영', value: '입문자 환영' },
  { label: '숙련자 환영', value: '숙련자 환영' },
];
