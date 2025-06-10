import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getInterestedKeywords, getMentionUsers, KeywordSettingOptionType, postInterestedKeywards } from '.';

export const useQueryGetMentionUsers = () => {
  return useQuery({
    queryKey: ['getMentionUsers'],
    staleTime: Infinity,
    queryFn: () => getMentionUsers(),
  });
};

export const useQueryGetInterestedKeywords = () => {
  return useQuery({
    queryKey: ['getInterestedKeywords'],
    queryFn: () => getInterestedKeywords(),
  });
};

export const useMutationInterestedKeywords = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (keywords: KeywordSettingOptionType[]) => postInterestedKeywards(keywords),
    onSuccess: () => {
      queryClient.invalidateQueries(['getInterestedKeywords']);
    },
  });
};
