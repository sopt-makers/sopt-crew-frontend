import MeetingQueryKey from '@api/meeting/MeetingQueryKey';
import { GetMeeting, GetMeetingList, GetMeetingMemberList, GetRecommendMeetingList } from '@api/meeting/type';
import { parsePartLabelToValue, parseStatusToNumber } from '@api/meeting/util';
import { ACTIVE_GENERATION } from '@constant/activeGeneration';
import { APPROVAL_STATUS_ENGLISH, APPROVAL_STATUS_KOREAN_TO_ENGLISH, RECRUITMENT_STATUS } from '@constant/option';
import { numberOptionList, numberOptionListDefault, sortOptionList, sortOptionListDefault } from '@data/options';
import {
  useCategoryParams,
  useIsOnlyActiveGenerationParams,
  useKeywordParams,
  usePageParams,
  usePartParams,
  useSearchParams,
  useSortByDateParams,
  useStatusParams,
  useTakeParams,
} from '@hook/queryString/custom';
import { queryOptions } from '@tanstack/react-query';
import { getMeeting, getMeetingList, getMeetingMemberList, getRecommendMeetingList } from '.';

export const useMeetingListQueryOption = () => {
  const { value: category } = useCategoryParams();
  const { value: status } = useStatusParams();
  const { value: search } = useSearchParams();
  const { value: page } = usePageParams();
  const { value: keyword } = useKeywordParams();
  const { value: isOnlyActiveGeneration } = useIsOnlyActiveGenerationParams();
  const { value: part } = usePartParams();

  const params: Omit<NonNullable<GetMeetingList['request']>, 'joinableParts'> & { joinableParts?: string } = {
    isOnlyActiveGeneration: isOnlyActiveGeneration === `${ACTIVE_GENERATION}기만` ? true : false,
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

  return queryOptions({
    queryKey: MeetingQueryKey.list(params as GetMeetingList['request']),
    queryFn: () => getMeetingList(params as GetMeetingList['request']),
  });
};

export const useMeetingQueryOption = ({ meetingId }: { meetingId: number }) => {
  return queryOptions<GetMeeting['response']>({
    queryKey: MeetingQueryKey.detail(meetingId),
    queryFn: () => getMeeting({ meetingId }),
    enabled: !!meetingId,
  });
};

export const useMeetingMemberListQueryOption = ({ meetingId }: { meetingId: string }) => {
  const { value: page } = usePageParams();
  const { value: status } = useStatusParams();
  const { value: take } = useTakeParams();
  const { value: sortByDate } = useSortByDateParams();

  const convertedNumberTake = numberOptionList[Number(take)] ?? numberOptionListDefault;
  const convertedSortTake = sortOptionList[Number(sortByDate)] ?? sortOptionListDefault;
  const DEFAULT_STATUS = APPROVAL_STATUS_ENGLISH.join(',');

  const params: GetMeetingMemberList['request'] = {
    page: Number(page),
    take: Number(convertedNumberTake.value),
    status:
      status?.length === 0 ? DEFAULT_STATUS : status.map(item => APPROVAL_STATUS_KOREAN_TO_ENGLISH[item]).join(','),
    date: convertedSortTake.value as 'desc' | 'asc',
  };

  return queryOptions<GetMeetingMemberList['response']>({
    queryKey: MeetingQueryKey.memberList(meetingId, params),
    queryFn: () => {
      return getMeetingMemberList({ params, meetingId });
    },
    enabled: !!meetingId,
  });
};

export const useRecommendMeetingListQuery = ({ meetingIds = [] }: { meetingIds: number[] }) => {
  return queryOptions<GetRecommendMeetingList['response']>({
    queryKey: MeetingQueryKey.recommendList(meetingIds),
    queryFn: () => getRecommendMeetingList({ meetingIds }),
  });
};
