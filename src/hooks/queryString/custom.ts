import { useMultiQueryString, useQueryString } from '.';

export const usePageParams = () => useQueryString('page', '1');
export const useSearchParams = () => useQueryString('search', '', true);
export const useTakeParams = () => useQueryString('take', '0', true);
export const useSortByDateParams = () => useQueryString('sort', '0', true);
export const useIsOnlyActiveGenerationParams = () => useQueryString('isOnlyActiveGeneration', 'false', true);

export const useCategoryParams = () => useMultiQueryString('category', true);
export const useStatusParams = () => useMultiQueryString('status', true);
export const useTypeParams = () => useMultiQueryString('type', true);
export const usePartParams = () => useMultiQueryString('part', true);
