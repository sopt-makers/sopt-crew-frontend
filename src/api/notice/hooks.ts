import { useQuery } from '@tanstack/react-query';
import { getNotices } from '.';

export default function useNotices() {
  const query = useQuery(['notices'], () => getNotices(), {
    select: res => res.data,
  });

  return {
    ...query,
  };
}
