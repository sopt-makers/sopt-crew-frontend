import { useMultiQueryString, useQueryString } from '.';

//더욱 간단하게 쿼리 파라미터를 사용할 수 있도록 돕는 훅 (2차 추상화)
export const usePageParams = () => useQueryString('page', '1');
export const useSearchParams = () => useQueryString('search', '', true);
export const useTakeParams = () => useQueryString('take', '0', true);
export const useSortByDateParams = () => useQueryString('sort', '0', true);
export const useSortTypeParams = () => useQueryString('sortType', 'LATEST', true);
export const useIsOnlyActiveGenerationParams = () => useQueryString('isOnlyActiveGeneration', 'false', true);
export const useStationKeywordParams = () => useQueryString('stationKeyword', '', true);

export const useCategoryParams = () => useMultiQueryString('category', true);
export const useStatusParams = () => useMultiQueryString('status', true);
export const useTypeParams = () => useMultiQueryString('type', true);
export const usePartParams = () => useMultiQueryString('part', true);
export const useKeywordParams = () => useMultiQueryString('keyword', true);
