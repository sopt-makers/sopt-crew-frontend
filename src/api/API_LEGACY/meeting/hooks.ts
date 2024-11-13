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
  postApplication,
  deleteApplication,
  updateApplication,
  UpdateApplicationRequest,
  downloadMeetingMemberCSV,
  getGroupBrowsingCard,
  GroupBrowsingCardDetail,
  GetMeetingResponse,
} from '.';

interface UseQueryGetMeetingParams {
  params: {
    id: string;
  };
  useQueryOptions?: UseQueryOptions<GetMeetingResponse>;
}

/**
 * @deprecated
 */
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
      select: response => response.data,
      suspense: true,
    }
  );
};

export const useQueryGetMeeting = ({
  params,
  useQueryOptions,
}: UseQueryGetMeetingParams): UseQueryResult<GetMeetingResponse> => {
  const { id } = params;

  return useQuery<GetMeetingResponse>({
    queryKey: ['getMeeting', id],
    queryFn: () => {
      return getMeeting(id);
    },
    enabled: !!id,
    ...useQueryOptions,
  });
};

/**
 * @deprecated
 */
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

export const useMutationDeleteMeeting = ({ useMutationOptions }: UseMutateBody<number>) => {
  return useMutation({
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

export const useMutationDeleteApplication = ({
  useMutationOptions,
}: UseMutateBody<number>): UseMutationResult<{ statusCode: number }, AxiosError, number> => {
  return useMutation<{ statusCode: number }, AxiosError, number>({
    ...useMutationOptions,
    mutationKey: ['deleteApplication'],
    mutationFn: deleteApplication,
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

export const useMutationDownloadMeetingMemberCSV = () =>
  useMutation(downloadMeetingMemberCSV, {
    onSuccess: ({ data }) => {
      const url = data.url;
      const a = document.createElement('a');
      a.href = url;
      a.download = 'groupMember.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
  });

export const useQueryGetGroupBrowsingCard = (): UseQueryResult<GroupBrowsingCardDetail[]> => {
  return useQuery({
    queryKey: ['getGroupBrowsingCard'],
    queryFn: () => {
      return getGroupBrowsingCard();
    },
  });
};
