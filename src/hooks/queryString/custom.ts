import { useMultiQueryString, useQueryString } from '.';

export const usePageParams = () => useQueryString('page', '1');
export const useSearchParams = () => useQueryString('search', '');

export const useCategoryParams = () => useMultiQueryString('category');
export const useStatusParams = () => useMultiQueryString('status');
