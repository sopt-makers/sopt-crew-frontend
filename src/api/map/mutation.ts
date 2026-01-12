import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMap } from '.';
import MapQueryKey from './MapQueryKey';

export const useDeleteMapMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (mapId: number) => deleteMap(mapId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MapQueryKey.list() });
    },
  });
};
