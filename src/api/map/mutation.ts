import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { deleteMap, putMapRecommendation } from '.';
import MapQueryKey from './MapQueryKey';
import { GetMapList } from './type';

export const useDeleteMapMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (mapId: number) => deleteMap(mapId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MapQueryKey.list() });
    },
  });
};

export const useRecommendMapMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (mapId: number) => putMapRecommendation(mapId),

    onMutate: async targetMapId => {
      await queryClient.cancelQueries({ queryKey: MapQueryKey.all() });

      const previousData = queryClient.getQueriesData({ queryKey: MapQueryKey.all() });

      queryClient.setQueriesData<InfiniteData<GetMapList['response']>>(
        { queryKey: [MapQueryKey.infiniteList()] },
        oldData => {
          if (!oldData) return undefined;

          return produce(oldData, draft => {
            draft.pages.forEach(page => {
              const target = page.soptMaps.find(map => map.id === targetMapId);
              if (target) {
                target.isRecommended = !target.isRecommended;
                target.recommendCount = (target.recommendCount ?? 0) + (target.isRecommended ? 1 : -1);
              }
            });
          });
        }
      );

      queryClient.setQueriesData<GetMapList['response']>({ queryKey: MapQueryKey.list() }, oldData => {
        if (!oldData) return undefined;

        return produce(oldData, draft => {
          const target = draft.soptMaps.find(map => map.id === targetMapId);
          if (target) {
            target.isRecommended = !target.isRecommended;
            target.recommendCount = (target.recommendCount ?? 0) + (target.isRecommended ? 1 : -1);
          }
        });
      });

      return { previousData };
    },

    onError: (err, newTodo, context) => {
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },

    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: MapQueryKey.all() });
    // },
  });
};
