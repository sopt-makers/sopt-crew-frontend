import {
  useCategoryParams,
  useIsOnlyActiveGenerationParams,
  usePageParams,
  usePartParams,
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
  deleteMeeting,
  fetchMeetingListOfAll,
  getMeeting,
  getMeetingPeopleList,
  PostApplicationRequest,
  MeetingPeopleResponse,
  MeetingResponse,
  postApplication,
  updateApplication,
  UpdateApplicationRequest,
  updateInvitation,
  UpdateInvitationRequest,
  deleteInvitation,
  DeleteInvitationRequest,
  getUsersToInvite,
} from '.';

interface UseQueryGetMeetingParams {
  params: {
    id: string;
  };
  useQueryOptions?: UseQueryOptions<MeetingResponse>;
}

interface UseQueryGetMeetingPeopleListParams {
  params: {
    id: string;
    page: number;
    take: number;
    status: string[];
    date: string;
    type: string[];
  };
  useQueryOptions?: UseQueryOptions<MeetingPeopleResponse>;
}
interface UseMutateBody<T> {
  useMutationOptions?: UseMutationOptions<{ statusCode: number }, AxiosError, T>;
}

export const useQueryMeetingListOfAll = () => {
  const { value: category } = useCategoryParams();
  const { value: status } = useStatusParams();
  const { value: search } = useSearchParams();
  const { value: page } = usePageParams();
  const { value: isOnlyActiveGeneration } = useIsOnlyActiveGenerationParams();
  const { value: part } = usePartParams();
  return useQuery(
    ['fetchMeetingList', 'all', page, category, status, search, isOnlyActiveGeneration, part],
    () =>
      fetchMeetingListOfAll({
        page: Number(page),
        category,
        status,
        search: search as string,
        isOnlyActiveGeneration,
        part,
      }),
    {
      select: response => response.data.data,
      suspense: true,
    }
  );
};

export const useQueryGetMeeting = ({
  params,
  useQueryOptions,
}: UseQueryGetMeetingParams): UseQueryResult<MeetingResponse> => {
  const { id } = params;

  return useQuery<MeetingResponse>({
    queryKey: ['getMeeting', id],
    queryFn: () => {
      return getMeeting(id);
    },
    enabled: !!id,
    ...useQueryOptions,
  });
};

export const useQueryGetMeetingPeopleList = ({
  params,
  useQueryOptions,
}: UseQueryGetMeetingPeopleListParams): UseQueryResult<MeetingPeopleResponse> => {
  const { id, page, take, status, date, type } = params;

  return useQuery<MeetingPeopleResponse>({
    queryKey: ['getMeetingPeopleList', id, page, take, status, date, type],
    queryFn: () => {
      return getMeetingPeopleList(params);
    },
    enabled: !!id,
    ...useQueryOptions,
  });
};

export const useMutationDeleteMeeting = ({
  useMutationOptions,
}: UseMutateBody<number>): UseMutationResult<{ statusCode: number }, AxiosError, number> => {
  return useMutation<{ statusCode: number }, AxiosError, number>({
    ...useMutationOptions,
    mutationKey: ['deleteMeeting'],
    mutationFn: deleteMeeting,
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
  meetingId: string;
  generation: string | null;
  name: string;
}
export const useUsersToInvite = ({ meetingId, generation, name }: UseUsersToInviteParams) => {
  return useQuery({
    queryKey: ['getUsersToInvite', meetingId, generation, name],
    queryFn: () => getUsersToInvite(meetingId, generation, name),
    enabled: !!meetingId,
  });
};
