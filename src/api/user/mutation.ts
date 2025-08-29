import UserQueryKey from '@api/user/UserQueryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { KeywordSettingOptionType, postInterestedKeywords } from '.';

export const useMutationInterestedKeywords = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (keywords: KeywordSettingOptionType[]) => postInterestedKeywords(keywords),
    onSuccess: () => {
      queryClient.invalidateQueries(UserQueryKey.interestedKeywords());
    },
  });
};
