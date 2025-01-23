import { UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import { MeetingPeopleResponse, getMeetingPeopleList } from '.';
import { fetchMeetingListOfAll, getGroupBrowsingCard, GroupBrowsingCardResponse } from '@api/API_LEGACY/meeting';

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
