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
import { UseQueryResult, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getMeeting, getMeetingList, getMeetingMemberList, getRecommendMeetingList } from '.';

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

  return useSuspenseQuery({
    queryKey: MeetingQueryKey.list(params as GetMeetingList['request']),
    queryFn: () => getMeetingList(params as GetMeetingList['request']),
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
