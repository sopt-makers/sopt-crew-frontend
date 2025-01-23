import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import { MeetingPeopleResponse, getMeetingPeopleList, getRecommendMeetingList } from '.';
import { paths } from '@/__generated__/schema2';

interface UseQueryGetMeetingPeopleListParams {
  params: {
    id: string;
    page: number;
    take: number;
    status: string[];
    date: string;
  };
  useQueryOptions?: UseQueryOptions<MeetingPeopleResponse>;
}

export const useQueryGetMeetingPeopleList = ({
  params,
  useQueryOptions,
}: UseQueryGetMeetingPeopleListParams): UseQueryResult<MeetingPeopleResponse> => {
  const { id, page, take, status, date } = params;

  return useQuery<MeetingPeopleResponse>({
    queryKey: ['getMeetingPeopleList', id, page, take, status, date],
    queryFn: () => {
      return getMeetingPeopleList(params);
    },
    enabled: !!id,
    ...useQueryOptions,
  });
};

export type RecommendMeetingListQueryResponse =
  paths['/meeting/v2/recommend']['get']['responses']['200']['content']['application/json;charset=UTF-8']['meetings'];
export const useGetRecommendMeetingListQuery = ({ meetingIds = [] }: { meetingIds: number[] }) => {
  return useQuery<RecommendMeetingListQueryResponse>({
    queryKey: ['getRecommendMeetingList', ...meetingIds],
    queryFn: () => getRecommendMeetingList({ meetingIds }),
  });
};
