import { getFlash, getFlashList } from '@api/flash';
import FlashQueryKey from '@api/flash/FlashQueryKey';
import { useQuery } from '@tanstack/react-query';

export const useFlashQuery = ({ meetingId }: { meetingId: number }) => {
  return useQuery({
    queryKey: FlashQueryKey.detail(meetingId),
    queryFn: () => getFlash(meetingId),
  });
};

export const useFlashListQuery = () => {
  return useQuery({
    queryKey: FlashQueryKey.list(),
    queryFn: getFlashList,
  });
};
