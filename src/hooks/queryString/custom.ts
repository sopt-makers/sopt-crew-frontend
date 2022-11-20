import { useMultiQueryString, useQueryString } from '.';

export const usePageParams = () => useQueryString('page', '1');
export const useSearchParams = () => useQueryString('search', '', true);

export const useCategoryParams = () => useMultiQueryString('category', true);
export const useStatusParams = () => useMultiQueryString('status', true);
