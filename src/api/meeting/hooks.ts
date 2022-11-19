import {
  useCategoryParams,
  useSearchParams,
  useStatusParams,
} from '@hooks/queryString/custom';
import { useQuery } from '@tanstack/react-query';
import { fetchGroupListOfAll } from '.';

export const useQueryGroupListOfAll = () => {
  const { value: category } = useCategoryParams();
  const { value: status } = useStatusParams();
  const { value: search } = useSearchParams();
  return useQuery(
    ['fetchGroupList', 'all', category, status, search],
    () => fetchGroupListOfAll({ category, status, search: search as string }),
    {
      select: response => response.data.data,
      suspense: true,
    }
  );
};
