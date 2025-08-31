import UserQueryKey from '@api/user/UserQueryKey';
import { queryOptions } from '@tanstack/react-query';
import {
  getInterestedKeywords,
  getUser,
  getUserApplication,
  getUserMeetingAll,
  getUserMeetingList,
  getUserProfile,
} from '.';

export const useUserQueryOption = () => {
  return queryOptions({
    queryFn: getUser,
    queryKey: UserQueryKey.list(),
    staleTime: Infinity,
  });
};

export const useUserApplicationQueryOption = () => {
  return queryOptions({
    queryFn: getUserApplication,
    queryKey: UserQueryKey.application(),
  });
};

export const useGetInterestedKeywordsQueryOption = () => {
  return queryOptions({
    queryKey: UserQueryKey.interestedKeywords(),
    queryFn: () => getInterestedKeywords(),
  });
};

export const useUserMeetingListQueryOption = () => {
  return queryOptions({
    queryKey: UserQueryKey.meetingList(),
    queryFn: getUserMeetingList,
  });
};

export const useUserMeetingAllQueryOption = () => {
  return queryOptions({
    queryKey: UserQueryKey.meetingAll(),
    queryFn: getUserMeetingAll,
  });
};

export const useUserProfileQueryOption = () => {
  return queryOptions({
    queryKey: UserQueryKey.profile(),
    queryFn: getUserProfile,
  });
};
