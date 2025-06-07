import { useQuery } from '@tanstack/react-query';
import { getInterestedKeywords, getMentionUsers } from '.';

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
    staleTime: Infinity,
    queryFn: () => getInterestedKeywords(),
  });
};
