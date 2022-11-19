import {
  useCategoryParams,
  useSearchParams,
  useStatusParams,
} from '@hooks/queryString/custom';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  deleteGroup,
  fetchGroupListOfAll,
  getGroup,
  getGroupPeopleList,
  GroupApplicationData,
  GroupPersonResponse,
  GroupResponse,
  postApplication,
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
  useMutationOptions?: UseMutationOptions<
    { statusCode: number },
    AxiosError,
    number
  >;
}

export const useMutationDeleteGroup = ({
  useMutationOptions,
}: UseMutationDeleteGroupParams): UseMutationResult<
  { statusCode: number },
  AxiosError,
  number
> => {
  return useMutation<{ statusCode: number }, AxiosError, number>({
    ...useMutationOptions,
    mutationKey: ['deleteGroup'],
    mutationFn: deleteGroup,
  });
};

interface UseMutationPostApplicationBody {
  useMutationOptions?: UseMutationOptions<
    { statusCode: number },
    AxiosError,
    GroupApplicationData
  >;
}

export const useMutationPostApplication = ({
  useMutationOptions,
}: UseMutationPostApplicationBody): UseMutationResult<
  { statusCode: number },
  AxiosError,
  GroupApplicationData
> => {
  return useMutation<{ statusCode: number }, AxiosError, GroupApplicationData>({
    ...useMutationOptions,
    mutationKey: ['postApplication'],
    mutationFn: postApplication,
  });
};
