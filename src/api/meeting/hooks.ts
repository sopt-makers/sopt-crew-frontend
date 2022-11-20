import {
  useCategoryParams,
  usePageParams,
  useSearchParams,
  useStatusParams,
} from '@hooks/queryString/custom';
import { useQuery } from '@tanstack/react-query';
import { fetchGroupListOfAll } from '.';

export const useQueryGroupListOfAll = () => {
  const { value: category } = useCategoryParams();
  const { value: status } = useStatusParams();
  const { value: search } = useSearchParams();
  const { value: page } = usePageParams();
  return useQuery(
    ['fetchGroupList', 'all', page, category, status, search],
    () =>
      fetchGroupListOfAll({
        page: Number(page),
        category,
        status,
        search: search as string,
      }),
    {
      select: response => response.data.data,
      suspense: true,
    }
  );
};
