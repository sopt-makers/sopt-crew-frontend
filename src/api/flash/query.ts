import { getFlash, getFlashList } from '@api/flash';
import FlashQueryKey from '@api/flash/FlashQueryKey';
import { queryOptions } from '@tanstack/react-query';

export const useFlashQueryOption = ({ meetingId }: { meetingId: number }) => {
  return queryOptions({
    queryKey: FlashQueryKey.detail(meetingId),
    queryFn: () => getFlash(meetingId),
  });
};

export const useFlashListQueryOption = () => {
  return queryOptions({
    queryKey: FlashQueryKey.list(),
    queryFn: getFlashList,
  });
};
