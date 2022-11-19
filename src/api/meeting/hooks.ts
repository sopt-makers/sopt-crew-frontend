import {
  useCategoryParams,
  useSearchParams,
  useStatusParams,
} from '@hooks/queryString/custom';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import {
  deleteGroup,
  fetchGroupListOfAll,
  getGroup,
  getGroupPeopleList,
  GroupPersonResponse,
  GroupResponse,
} from '.';

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

interface UseQueryGetGroupParams {
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

interface UseQueryGetGroupPeopleListParams {
  params: {
    id: string;
    limit: number;
    status: number;
    date: string;
  };
  useQueryOptions?: UseQueryOptions<GroupPersonResponse[]>;
}

export const useQueryGetGroupPeopleList = ({
  params,
  useQueryOptions,
}: UseQueryGetGroupPeopleListParams): UseQueryResult<GroupPersonResponse[]> => {
  const { id, limit, status, date } = params;

  return useQuery<GroupPersonResponse[]>({
    queryKey: ['getGroupPeopleList', id, limit, status, date],
    queryFn: () => {
      return getGroupPeopleList({ id, limit, status, date });
    },
    enabled: !!id,
    ...useQueryOptions,
  });
};

interface UseMutationDeleteGroupParams {
  params: {
    id: string;
  };
  useMutationOptions?: UseMutationOptions<{ statusCode: number }>;
}

export const useMutationDeleteGroup = ({
  params,
  useMutationOptions,
}: UseMutationDeleteGroupParams) => {
  const { id } = params;
  const queryClient = useQueryClient();

  return useMutation<{ statusCode: number }>({
    mutationFn: () => {
      return deleteGroup(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchGroupList'] });
    },
    ...useMutationOptions,
  });
};
