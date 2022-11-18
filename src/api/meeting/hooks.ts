import {
  useCategoryParams,
  useSearchParams,
  useStatusParams,
} from '@hooks/queryString/custom';
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { fetchGroupListOfAll, getGroup, GroupResponse } from '.';

export const useQueryGroupListOfAll = () => {
  const { value: category } = useCategoryParams();
  const { value: status } = useStatusParams();
  const { value: search } = useSearchParams();
  return useQuery(
    ['fetchGroupList', category, status, search],
    () => fetchGroupListOfAll({ category, status, search: search as string }),
    {
      select: response => response.data.data,
      suspense: true,
    }
  );
};

export interface UseQueryGetGroupParams {
  params: {
    id: string;
  };
  useQueryOptions?: UseQueryOptions<GroupResponse>;
}

export const useQueryGetGroup = ({
  params,
  useQueryOptions,
}: UseQueryGetGroupParams): UseQueryResult<GroupResponse> => {
  const { id } = params;

  return useQuery<GroupResponse>({
    queryKey: ['getGroup', id],
    queryFn: () => {
      return getGroup(id);
    },
    enabled: !!id,
    ...useQueryOptions,
  });
};
