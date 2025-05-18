import {
  useCategoryParams,
  useIsOnlyActiveGenerationParams,
  useKeywordParams,
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
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import alertErrorMessage from '@utils/alertErrorMessage';
import { AxiosError } from 'axios';
import {
  deleteApplication,
  deleteMeeting,
  downloadMeetingMemberCSV,
  fetchMeetingListOfAll,
  getGroupBrowsingCard,
  getMeeting,
  getMeetingPeopleList,
  GetMeetingResponse,
  GroupBrowsingCardResponse,
  MeetingPeopleResponse,
  postApplication,
  PostApplicationRequest,
  postEventApplication,
  updateApplication,
  UpdateApplicationRequest,
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
  //쿼리 파라미터값들을 읽어서, 서버에 모임 리스트 받아오는데 사용
  const { value: category } = useCategoryParams();
  const { value: status } = useStatusParams();
  const { value: search } = useSearchParams();
  const { value: page } = usePageParams();
  const { value: keyword } = useKeywordParams();
  const { value: isOnlyActiveGeneration } = useIsOnlyActiveGenerationParams();
  const { value: part } = usePartParams();
  return useQuery(
    ['fetchMeetingList', 'all', page, category, status, search, keyword, isOnlyActiveGeneration, part],
    () =>
      fetchMeetingListOfAll({
        page: Number(page),
        category,
        status,
        keyword,
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

export const useMutationPostEventApplication = ({
  useMutationOptions,
}: UseMutateBody<PostApplicationRequest>): UseMutationResult<
  { statusCode: number },
  AxiosError,
  PostApplicationRequest
> => {
  return useMutation<{ statusCode: number }, AxiosError, PostApplicationRequest>({
    ...useMutationOptions,
    mutationKey: ['postApplication'],
    mutationFn: postEventApplication,
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
  const queryClient = useQueryClient();

  return useMutation<{ statusCode: number }, AxiosError, UpdateApplicationRequest>({
    ...useMutationOptions,
    mutationKey: ['updateApplication'],
    mutationFn: updateApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getMeetingPeopleList'],
      });
    },
    onError: (error: AxiosError) => {
      alertErrorMessage(error);
    },
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

export const useQueryGetGroupBrowsingCard = (): UseQueryResult<GroupBrowsingCardResponse> => {
  return useQuery({
    queryKey: ['getGroupBrowsingCard'],
    queryFn: () => {
      return getGroupBrowsingCard();
    },
  });
};
