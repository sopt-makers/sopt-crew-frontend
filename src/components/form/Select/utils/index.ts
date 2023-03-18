import type { Option } from '../OptionItem';

export const isAllSelect = (option?: Option) => option?.value === 'all';
export const isAllUnselected = (prev: Option[], next: Option[]) =>
  prev.some(v => v.value === 'all' && !next.some(v => v.value === 'all'));
