export type Option<T = string> = {
  value: T;
  label: string;
};

export const ORDER_OPTIONS: Option<string>[] = [
  { label: '최신순', value: 'LATEST' },
  { label: '인기순', value: 'POPULAR' },
];
