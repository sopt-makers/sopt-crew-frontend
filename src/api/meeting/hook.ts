import MeetingQueryKey from '@api/meeting/MeetingQueryKey';
import { GetMeeting, GetMeetingList, GetMeetingMemberList, GetRecommendMeetingList } from '@api/meeting/type';
import { parsePartLabelToValue, parseStatusToNumber } from '@api/meeting/util';
import { RECRUITMENT_STATUS } from '@constants/option';
import {
  useCategoryParams,
  useIsOnlyActiveGenerationParams,
  useKeywordParams,
  usePageParams,
  usePartParams,
  useSearchParams,
  useStatusParams,
} from '@hooks/queryString/custom';
import { UseQueryResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FormType } from '@type/form';
import alertErrorMessage from '@utils/alertErrorMessage';
import { AxiosError } from 'axios';
import {
  deleteMeeting,
  deleteMeetingApplication,
  getMeeting,
  getMeetingList,
  getMeetingMemberCSV,
  getMeetingMemberList,
  getRecommendMeetingList,
  postEventApplication,
  postMeeting,
  postMeetingApplication,
  putMeeting,
  updateMeetingApplication,
} from '.';
import { serializeMeetingData } from './serialize';

export const useMeetingListQuery = () => {
  const { value: category } = useCategoryParams();
  const { value: status } = useStatusParams();
  const { value: search } = useSearchParams();
  const { value: page } = usePageParams();
  const { value: keyword } = useKeywordParams();
  const { value: isOnlyActiveGeneration } = useIsOnlyActiveGenerationParams();
  const { value: part } = usePartParams();

  const params: Omit<NonNullable<GetMeetingList['request']>, 'joinableParts'> & { joinableParts?: string } = {
    isOnlyActiveGeneration: isOnlyActiveGeneration === '36기만' ? true : false,
    page: Number(page),
  };

  if (category?.length) {
    params.category = category.join(',');
  }

  if (keyword?.length) {
    params.keyword = keyword.join(',');
  }

  if (status?.length) {
    params.status = status
      .map(item => parseStatusToNumber(item, RECRUITMENT_STATUS))
      .filter(item => item !== null)
      .join(',');
  }

  if (part?.length) {
    params.joinableParts = part
      .map((item: string) => parsePartLabelToValue(item))
      .filter(item => item !== null)
      .join(',');
  }

  if (search) {
    params.query = search;
  }

  return useQuery({
    queryKey: MeetingQueryKey.list(params as GetMeetingList['request']),
    queryFn: () => getMeetingList(params as GetMeetingList['request']),
    suspense: true,
  });
};

export const useMeetingQuery = ({ meetingId }: { meetingId: number }) => {
  return useQuery<GetMeeting['response']>({
    queryKey: MeetingQueryKey.detail(meetingId),
    queryFn: () => getMeeting({ meetingId }),
    enabled: !!meetingId,
  });
};

export const useMeetingMemberListQuery = ({
  params,
  meetingId,
}: {
  params: GetMeetingMemberList['request'];
  meetingId: string;
}): UseQueryResult<GetMeetingMemberList['response']> => {
  delete params?.status;

  return useQuery<GetMeetingMemberList['response']>({
    queryKey: MeetingQueryKey.memberList(),
    queryFn: () => {
      return getMeetingMemberList({ params, meetingId });
    },
    enabled: !!meetingId,
  });
};

export const useRecommendMeetingListQuery = ({ meetingIds = [] }: { meetingIds: number[] }) => {
  return useQuery<GetRecommendMeetingList['response']>({
    queryKey: MeetingQueryKey.recommendList(meetingIds),
    queryFn: () => getRecommendMeetingList({ meetingIds }),
  });
};

export const useDeleteMeetingMutation = () => {
  return useMutation({
    mutationFn: deleteMeeting,
  });
};

export const usePostMeetingApplicationMutation = () => {
  return useMutation({
    mutationFn: postMeetingApplication,
  });
};

export const usePostMeetingMutation = () => {
  return useMutation({
    mutationFn: (formData: FormType) => postMeeting(serializeMeetingData(formData)),
    onError: () => {
      alert('모임을 개설하지 못했습니다.');
    },
  });
};

export const usePutMeetingMutation = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormType) => putMeeting(meetingId, serializeMeetingData(formData)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MeetingQueryKey.detail(meetingId) });
    },
  });
};

export const useDeleteMeetingApplicationMutation = () => {
  return useMutation({
    mutationFn: deleteMeetingApplication,
  });
};

export const useUpdateMeetingApplicationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMeetingApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: MeetingQueryKey.memberList(),
      });
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        alertErrorMessage(error);
      }
    },
  });
};

export const usePostEventApplicationMutation = () => {
  return useMutation({
    mutationFn: postEventApplication,
  });
};

export const useDownloadMeetingMemberCSVMutation = () => {
  return useMutation({
    mutationFn: getMeetingMemberCSV,
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
};
