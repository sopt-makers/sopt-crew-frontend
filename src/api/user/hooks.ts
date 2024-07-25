import { useQuery } from '@tanstack/react-query';
import { getMentionUsers } from '.';

export const useQueryGetMentionUsers = () => {
  return useQuery({
    queryKey: ['getMentionUsers'],
    staleTime: Infinity,
    queryFn: () => getMentionUsers(),
  });
};
