import { useCategoryParams, usePageParams, useSearchParams, useStatusParams } from '@hooks/queryString/custom';
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
  updateInvitation,
  UpdateInvitationRequest,
  deleteInvitation,
  DeleteInvitationRequest,
  getUsersToInvite,
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
    status: string[];
    date: string;
    type: string[];
  };
  useQueryOptions?: UseQueryOptions<GroupPeopleResponse>;
}
interface UseMutateBody<T> {
  useMutationOptions?: UseMutationOptions<{ statusCode: number }, AxiosError, T>;
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
  const { id, page, take, status, date, type } = params;

  return useQuery<GroupPeopleResponse>({
    queryKey: ['getGroupPeopleList', id, page, take, status, date, type],
    queryFn: () => {
      return getGroupPeopleList(params);
    },
    enabled: !!id,
    ...useQueryOptions,
  });
};

export const useMutationDeleteGroup = ({
  useMutationOptions,
}: UseMutateBody<number>): UseMutationResult<{ statusCode: number }, AxiosError, number> => {
  return useMutation<{ statusCode: number }, AxiosError, number>({
    ...useMutationOptions,
    mutationKey: ['deleteGroup'],
    mutationFn: deleteGroup,
  });
};

export const useMutationPostApplication = ({
  useMutationOptions,
}: UseMutateBody<PostApplicationRequest>): UseMutationResult<
  { statusCode: number },
  AxiosError,
  PostApplicationRequest
> => {
  return useMutation<{ statusCode: number }, AxiosError, PostApplicationRequest>({
    ...useMutationOptions,
    mutationKey: ['postApplication'],
    mutationFn: postApplication,
  });
};

export const useMutationUpdateApplication = ({
  useMutationOptions,
}: UseMutateBody<UpdateApplicationRequest>): UseMutationResult<
  { statusCode: number },
  AxiosError,
  UpdateApplicationRequest
> => {
  return useMutation<{ statusCode: number }, AxiosError, UpdateApplicationRequest>({
    ...useMutationOptions,
    mutationKey: ['updateApplication'],
    mutationFn: updateApplication,
  });
};

export const useMutationUpdateInvitation = ({
  useMutationOptions,
}: UseMutateBody<UpdateInvitationRequest>): UseMutationResult<
  { statusCode: number },
  AxiosError,
  UpdateInvitationRequest
> => {
  return useMutation<{ statusCode: number }, AxiosError, UpdateInvitationRequest>({
    ...useMutationOptions,
    mutationKey: ['updateInvitation'],
    mutationFn: updateInvitation,
  });
};

export const useMutationDeleteInvitation = ({
  useMutationOptions,
}: UseMutateBody<DeleteInvitationRequest>): UseMutationResult<
  { statusCode: number },
  AxiosError,
  DeleteInvitationRequest
> => {
  return useMutation<{ statusCode: number }, AxiosError, DeleteInvitationRequest>({
    ...useMutationOptions,
    mutationKey: ['deleteInvitation'],
    mutationFn: deleteInvitation,
  });
};

interface UseUsersToInviteParams {
  groupId: string;
  generation: string | null;
  name: string;
}
export const useUsersToInvite = ({ groupId, generation, name }: UseUsersToInviteParams) => {
  return useQuery({
    queryKey: ['getUsersToInvite', groupId, generation, name],
    queryFn: () => getUsersToInvite(groupId, generation, name),
    enabled: !!groupId,
  });
};
