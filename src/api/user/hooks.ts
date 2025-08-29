import UserQueryKey from '@api/user/UserQueryKey';
import { useQuery } from '@tanstack/react-query';
import {
  getInterestedKeywords,
  getUser,
  getUserApplication,
  getUserMeetingAll,
  getUserMeetingList,
  getUserProfile,
} from '.';

export const useUserQuery = () => {
  return useQuery({
    queryFn: getUser,
    queryKey: UserQueryKey.list(),
    staleTime: Infinity,
  });
};

export const useUserApplicationQuery = () => {
  return useQuery({
    queryFn: getUserApplication,
    queryKey: UserQueryKey.application(),
  });
};

export const useQueryGetInterestedKeywords = () => {
  return useQuery({
    queryKey: UserQueryKey.interestedKeywords(),
    queryFn: () => getInterestedKeywords(),
  });
};

export const useUserMeetingListQuery = () => {
  return useQuery({
    queryKey: UserQueryKey.meetingList(),
    queryFn: getUserMeetingList,
  });
};

export const useUserMeetingAllQuery = () => {
  return useQuery({
    queryKey: UserQueryKey.meetingAll(),
    queryFn: getUserMeetingAll,
  });
};

export const useUserProfileQuery = () => {
  return useQuery({
    queryKey: UserQueryKey.profile(),
    queryFn: getUserProfile,
  });
};
