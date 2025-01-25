import { getFlashById, GetFlashByIdResponse, getFlashList } from '@api/flash';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type UseFlashByIdQueryProps = {
  meetingId: number;
};
export const useFlashByIdQuery = ({ meetingId }: UseFlashByIdQueryProps): UseQueryResult<GetFlashByIdResponse> => {
  return useQuery({
    queryKey: ['getFlash', meetingId],
    queryFn: async () => {
      try {
        return await getFlashById(meetingId);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 404) return null;
        throw error;
      }
    },
  });
};

export const useFlashListQuery = () => {
  return useQuery({
    queryKey: ['flashList'],
    queryFn: () => getFlashList(),
  });
};
