export const numberOptionList = [
  { label: '10명씩 보기', value: '10' },
  { label: '30명씩 보기', value: '30' },
  { label: '50명씩 보기', value: '50' },
];

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

export const parts = [
  { label: '대상 파트', value: null },
  { label: '전체', value: 'all', order: 1 },
  { label: '기획', value: 'PM', order: 2 },
  { label: '디자인', value: 'DESIGN', order: 3 },
  { label: '웹', value: 'WEB', order: 4 },
  { label: '안드로이드', value: 'ANDROID', order: 5 },
  { label: 'iOS', value: 'IOS', order: 6 },
  { label: '서버', value: 'SERVER', order: 7 },
];
