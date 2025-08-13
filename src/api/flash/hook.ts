import { getFlash, getFlashList, postFlash, putFlash } from '@api/flash';
import FlashQueryKey from '@api/flash/FlashQueryKey';
import { serializeFlashFormData } from '@api/flash/serialize';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FlashFormType } from '@type/form';

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

export const usePutFlashMutation = ({ meetingId }: { meetingId: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FlashFormType }) =>
      putFlash(id, serializeFlashFormData(formData)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FlashQueryKey.detail(meetingId) });
    },
  });
};

export const usePostFlashMutation = () => {
  return useMutation({
    mutationFn: (formData: FlashFormType) => postFlash(serializeFlashFormData(formData)),
    onError: () => {
      alert('번쩍을 개설하지 못했습니다.');
    },
  });
};
