import { useMultiQueryString, useQueryString } from '.';

export const usePageParams = () => useQueryString('page', '1');
export const useSearchParams = () => useQueryString('search', '', true);
export const useTakeParams = () => useQueryString('take', '0', true);
export const useSortParams = () => useQueryString('sort', '0', true);

export const useCategoryParams = () => useMultiQueryString('category', true);
export const useStatusParams = () => useMultiQueryString('status', true);
export const useTypeParams = () => useMultiQueryString('type', true);
