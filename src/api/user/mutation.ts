import UserQueryKey from '@api/user/UserQueryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserMeetingAll, KeywordSettingOptionType, postInterestedKeywords } from '.';

export const useMutationInterestedKeywords = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (keywords: KeywordSettingOptionType[]) => postInterestedKeywords(keywords),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: UserQueryKey.interestedKeywords() });
    },
  });
};

export const useUserMeetingListMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getUserMeetingAll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: UserQueryKey.meetingAll() });
    },
  });
};
