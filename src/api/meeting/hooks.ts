import {
  useCategoryParams,
  usePageParams,
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
  PostApplicationRequest,
  GroupPeopleResponse,
  GroupResponse,
  postApplication,
  updateApplication,
  UpdateApplicationRequest,
} from '.';

interface UseQueryGetGroupParams {
  params: {
    id: string;
  };
  useQueryOptions?: UseQueryOptions<GroupResponse>;
}

interface UseQueryGetGroupPeopleListParams {
  params: {
    id: string;
    page: number;
    take: number;
    status: number;
    date: string;
  };
  useQueryOptions?: UseQueryOptions<GroupPeopleResponse>;
}

interface UseMutationDeleteGroupParams {
  useMutationOptions?: UseMutationOptions<
    { statusCode: number },
    AxiosError,
    number
  >;
}

interface UseMutationPostApplicationBody {
  useMutationOptions?: UseMutationOptions<
    { statusCode: number },
    AxiosError,
    PostApplicationRequest
  >;
}

interface UseMutationUpdateApplicationBody {
  useMutationOptions?: UseMutationOptions<
    { statusCode: number },
    AxiosError,
    UpdateApplicationRequest
  >;
}

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

export const useQueryGetGroupPeopleList = ({
  params,
  useQueryOptions,
}: UseQueryGetGroupPeopleListParams): UseQueryResult<GroupPeopleResponse> => {
  const { id, page, take, status, date } = params;

  return useQuery<GroupPeopleResponse>({
    queryKey: ['getGroupPeopleList', id, page, take, status, date],
    queryFn: () => {
      return getGroupPeopleList(params);
    },
    enabled: !!id,
    ...useQueryOptions,
  });
};

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

export const useMutationPostApplication = ({
  useMutationOptions,
}: UseMutationPostApplicationBody): UseMutationResult<
  { statusCode: number },
  AxiosError,
  PostApplicationRequest
> => {
  return useMutation<
    { statusCode: number },
    AxiosError,
    PostApplicationRequest
  >({
    ...useMutationOptions,
    mutationKey: ['postApplication'],
    mutationFn: postApplication,
  });
};

export const useMutationUpdateApplication = ({
  useMutationOptions,
}: UseMutationUpdateApplicationBody): UseMutationResult<
  { statusCode: number },
  AxiosError,
  UpdateApplicationRequest
> => {
  return useMutation<
    { statusCode: number },
    AxiosError,
    UpdateApplicationRequest
  >({
    ...useMutationOptions,
    mutationKey: ['updateApplication'],
    mutationFn: updateApplication,
  });
};
