import { getLightningById, GetLightningByIdResponse, getLightningList } from '@api/lightning';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type UseLightningByIdQueryProps = {
  meetingId: number;
};
export const useLightningByIdQuery = ({
  meetingId,
}: UseLightningByIdQueryProps): UseQueryResult<GetLightningByIdResponse> => {
  return useQuery({
    queryKey: ['getLightning', meetingId],
    queryFn: async () => {
      try {
        return await getLightningById(meetingId);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 404) return null;
        throw error;
      }
    },
  });
};

export const useLightningListQuery = ({ page, take }: { page: number; take: number }) => {
  return useQuery(
    ['lightningList', page],
    () =>
      getLightningList({
        page,
        take,
      }),
    {
      select: response => response.data,
      suspense: true,
    }
  );
};
